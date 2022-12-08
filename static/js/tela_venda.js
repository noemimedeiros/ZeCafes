const observacoes = document.getElementById('observacoes');
const bebidas = document.getElementById('bebidas');
const cafes = document.getElementById('cafes');
const lanches = document.getElementById('lanches');
const sobremesas = document.getElementById('sobremesas');
const acucares = document.getElementsByName('acucares');
const input_pedidos_adicionados = document.getElementById('input-pedidos-adicionados');
const tamanhos = document.getElementsByName('tamanhos');
const selecionar_acucar = document.getElementById('acucar-btn');
const input_pedido_numero = document.getElementById('input-pedido-numero');
const input_pedido_valor = document.getElementById('input-pedido-valor');
const h4_valor_total = document.getElementById('valor-total');
const h5_total_pedido = document.getElementById('total-pedido');
const temperatura = document.getElementById('temperatura');
const levar = document.getElementById('levar');
const btn_adicionar_produto = document.getElementById('adicionar-produto');
const adicionar_observacao = document.getElementById('botao-obs');
const section_venda_acoes = document.getElementById('section-venda-acoes');
const section_preferencias = document.getElementById('section-preferencias');
const cards_produtos = document.getElementsByClassName('cards-produtos');

function abrir_modal_finalizar(){
    if (input_pedidos_adicionados.value.match(/^(\s)+$/) || input_pedidos_adicionados.value != ''){ 
        $("#finalizar-pedido").modal("show");
    };
}

$(document).ready(function(){
    document.getElementById('pedido-numero').innerHTML = Math.floor(Math.random() * 90000) + 10000 ;
});

function desabilitar_opcoes() {
    cafesdisabled = true;
    bebidas.disabled = true;
    lanchesdisabled = true;
    sobremesas.disabled = true;
    for (let card of cards_produtos){ card.style.overflow = 'hidden' }
}

function fechar_produto() {
    document.querySelectorAll(".card").forEach(card => card.removeAttribute('style'));
    document.querySelectorAll(".card > .produto_selecionado ").forEach(input => input.value = '');
    section_preferencias.style.display = 'none';
    section_venda_acoes.style.display = 'none';
    document.getElementsByName('qty')[0].value = 1;
    cafesdisabled = false;
    bebidas.disabled = false;
    lanchesdisabled = false;
    sobremesas.disabled = false;
    for (let card of cards_produtos){ card.style.overflow = 'scroll' };
    acucares[0].checked = true;
    tamanhos[0].checked = true;
    selecionar_acucar.checked = false;
    levar.checked = false;
    adicionar_observacao.checked = false;
    observacoes.value = '';
    observacoes.disabled = true;
    for (let opcoes of acucares){ opcoes.disabled = true };
    input_pedidos_adicionados.value = pedido_form.trim();
    input_pedido_numero.value = document.getElementById('pedido-numero').innerHTML;
    input_pedido_valor.value = h5_total_pedido.innerHTML.replace(',', '.');
};

var valor_produto = 0;
var valor = 0;
var valor_total = 0;
var index = 0;
var pedido_form = '';

function selecionar_produto(produto) {
    var array_pedidos = [];
    document.querySelectorAll(".card > .produto_selecionado ").forEach(input => array_pedidos.push(input.value));
    index = index + 1;
    if (!array_pedidos.includes("selecionado")){
        produto.children[0].value = 'selecionado';
        if (produto.children[1].value == 'Café'){
            produto.style = 'border: 1.7px solid var(--marrom-700);';
            section_preferencias.style.display = 'block';
            section_venda_acoes.style.display = 'flex';
            h4_valor_total.innerHTML = produto.children[4].children[1].innerText;
            valor_produto = produto.children[4].children[1].innerText;
            desabilitar_opcoes();
            btn_adicionar_produto.onclick = function () {
                let nome_produto = produto.children[4].children[0].innerText;
                let check = document.getElementsByName("tamanhos");
                let quantidade_produto = document.getElementsByName('qty')[0].value;
                for (var i=0;i<check.length;i++){ 
                    if (check[i].checked == true){ 
                        var tamanho_produto = check[i].value;
                    }  else {
                        // pass
                    }
                };
                if (temperatura.checked){
                    var temperatura_produto = "Quente";
                }if (!temperatura.checked){
                    var temperatura_produto = "Gelado";
                }
                var levar_produto = "Consumo local";
                if (levar.checked){
                    var levar_produto = "Para levar";
                }if (!temperatura.checked){
                    var levar_produto = "Consumo local";
                }
                if (selecionar_acucar.checked){
                    let check_acucar = document.getElementsByName("acucares"); 
                    for (var i=0;i<check_acucar.length;i++){ 
                        if (check_acucar[i].checked == true){ 
                            var acucar_produto = check_acucar[i].value;
                        }  else {
                            // pass
                        }
                    }
                }if (!selecionar_acucar.checked){
                    var acucar_produto = "Sem açúcar";
                }
                if(adicionar_observacao.checked && observacoes.value != ''){
                    var observacoes_produto = 'Obs: '+observacoes.value;
                }if (!adicionar_observacao.checked || observacoes.value == ''){
                    var observacoes_produto = "";
                }

                var pedido = `
                <div class="pedido-section" id="${index}">
                    <div class="d-flex">
                        <h6 class="me-3"><b>${quantidade_produto} ${nome_produto}</h6>
                        <h6 class="ms-auto me-2">${h4_valor_total.innerHTML.replace(".", ",")}</b></h6>
                        <button onclick="excluir_pedido(${index})" class="lixeira-pedido"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    <p class="mb-0">${tamanho_produto}</p>
                    <p class="mb-0">${temperatura_produto}</p>
                    <p class="mb-0">${acucar_produto}</p>
                    <p class="mb-0">${levar_produto}</p>
                    <p>${observacoes_produto}</p>
                    <hr class="hr-pedido m-0"></hr>
                </div>
                `;
                pedido_form = pedido_form += `
                <div class="pedido-section" id="${index}">
                    <div class="d-flex mt-2">
                        <h6 class="me-3"><b>${quantidade_produto} ${nome_produto}</b></h6>
                    </div>
                    <p class="mb-0">${tamanho_produto}</p>
                    <p class="mb-0">${temperatura_produto}</p>
                    <p class="mb-0">${acucar_produto}</p>
                    <p class="mb-0">${levar_produto}</p>
                    <p>${observacoes_produto}</p>
                    <hr class="hr-pedido m-0"></hr>
                </div>
                `;
                document.getElementById('pedidos-adicionados').innerHTML += pedido;
                document.getElementsByName('qty')[0].value = 1;
                valor_total = (parseFloat(valor_total) + parseFloat(h4_valor_total.innerHTML.replace(',', '.'))).toFixed(2)
                h5_total_pedido.innerHTML = valor_total.replace(".", ",");
                fechar_produto();
            }
        }else {
            produto.style = 'border: 1px solid var(--marrom-700);';
            section_venda_acoes.style.display = 'flex';
            h4_valor_total.innerHTML = produto.children[4].children[1].innerText;
            valor_produto = produto.children[4].children[1].innerText;
            desabilitar_opcoes();
            btn_adicionar_produto.onclick = function () {
                let nome_produto = produto.children[4].children[0].innerText;
                let quantidade_produto = document.getElementsByName('qty')[0].value;
                var pedido = `
                <div class="pedido-section" id="${index}">
                    <div class="d-flex">
                        <h6><b>${quantidade_produto} ${nome_produto}</h6>
                        <h6 class="ms-auto me-2">${h4_valor_total.innerHTML.replace(".", ",")}</b></h6>
                        <button onclick="excluir_pedido(${index})" class="lixeira-pedido"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                    <hr class="hr-pedido mt-0"></hr>
                </div>
                `;
                pedido_form = pedido_form += `
                <div class="pedido-section" id="${index}">
                    <div class="d-flex mt-2">
                        <h6><b>${quantidade_produto} ${nome_produto}</b></h6>
                    </div>
                    <hr class="hr-pedido mt-0"></hr>
                </div>
                `;
                document.getElementById('pedidos-adicionados').innerHTML += pedido;
                document.getElementsByName('qty')[0].value = 1;
                valor_total = (parseFloat(valor_total) + parseFloat(h4_valor_total.innerHTML.replace(',', '.'))).toFixed(2);
                h5_total_pedido.innerHTML = valor_total.replace(".", ",");
                fechar_produto();
            }
        }
    };
}

function excluir_pedido(index){
    for (let pedido of document.getElementsByClassName('pedido-section')){
        if (pedido.id == index){
            document.getElementById('pedidos-adicionados').removeChild(pedido);
            input_pedidos_adicionados.value = document.getElementById('pedidos-adicionados').innerHTML;
            valor_total = (valor_total - parseFloat(pedido.children[0].children[2].children[0].innerText.replace(',', '.')).toFixed(2)).toFixed(2);
            h5_total_pedido.innerHTML = valor_total.replace(".", ",");
            input_pedido_valor.value = h5_total_pedido.innerHTML;
        }
    };

}

selecionar_acucar.onclick = function () {
    if (selecionar_acucar.checked){
    document.querySelectorAll(".acucar > div > label > input").forEach(inputs => inputs.disabled=false );
    }if (!selecionar_acucar.checked){
        document.querySelectorAll(".acucar > div > label > input").forEach(inputs => inputs.disabled=true );
    }
}

adicionar_observacao.onclick = function () {
    if (adicionar_observacao.checked){
        observacoes.disabled = false;
    }if (!adicionar_observacao.checked){
        observacoes.disabled = true;
        observacoes.value = '';
    }
}

function atualizar_valor(){
    valor = (parseFloat(valor_produto.replace(',', '.'))*(parseInt(document.getElementsByName('qty')[0].value))).toFixed(2)
    h4_valor_total.innerHTML = valor.replace(".", ",");
}

$(document).ready(function(){
    $('.count').prop('disabled', true);
    $(document).on('click','.plus',function(){
        $('.count').val(parseInt($('.count').val()) + 1 );
        atualizar_valor();
    });
    $(document).on('click','.minus',function(){
    $('.count').val(parseInt($('.count').val()) - 1 );
        if ($('.count').val() == 0) {
            $('.count').val(1);
        }
        atualizar_valor();
    });
});
