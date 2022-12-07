function abrir_modal_finalizar(){
    if (document.getElementById('input-pedidos-adicionados').value.match(/^(\s)+$/) || document.getElementById('input-pedidos-adicionados').value != ''){ 
        $("#finalizar-pedido").modal("show");
    };
}

$(document).ready(function(){
    document.getElementById('pedido-numero').innerHTML = Math.floor(Math.random() * 90000) + 10000 ;

});
function desabilitar_opcoes() {
    document.getElementById('cafes').disabled = true;
    document.getElementById('bebidas').disabled = true;
    document.getElementById('lanches').disabled = true;
    document.getElementById('sobremesas').disabled = true;
    for (let card of document.getElementsByClassName('cards-produtos')){ card.style.overflow = 'hidden' }
}

function fechar_produto() {
    document.querySelectorAll(".card").forEach(card => card.removeAttribute('style'));
    document.querySelectorAll(".card > .produto_selecionado ").forEach(input => input.value = '');
    document.getElementById('section-preferencias').style.display = 'none';
    document.getElementById('section-venda-acoes').style.display = 'none';
    document.getElementsByName('qty')[0].value = 1;
    document.getElementById('cafes').disabled = false;
    document.getElementById('bebidas').disabled = false;
    document.getElementById('lanches').disabled = false;
    document.getElementById('sobremesas').disabled = false;
    for (let card of document.getElementsByClassName('cards-produtos')){ card.style.overflow = 'scroll' };
    document.getElementById('input-pedidos-adicionados').value = pedido_form.trim();
    document.getElementById('input-pedido-numero').value = document.getElementById('pedido-numero').innerHTML;
    document.getElementById('input-pedido-valor').value = document.getElementById('total-pedido').innerHTML;
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
            produto.style = 'border: 1.5px solid var(--marrom-700);';
            document.getElementById('section-preferencias').style.display = 'block';
            document.getElementById('section-venda-acoes').style.display = 'flex';
            document.getElementById('valor-total').innerHTML = produto.children[4].children[1].innerText;
            valor_produto = produto.children[4].children[1].innerText;
            desabilitar_opcoes();
            document.getElementById('adicionar-produto').onclick = function () {
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
                if (document.getElementById('temperatura').checked){
                    var temperatura_produto = "Quente";
                }if (!document.getElementById('temperatura').checked){
                    var temperatura_produto = "Gelado";
                }
                var levar_produto = "Consumo local";
                if (document.getElementById('levar').checked){
                    var levar_produto = "Para levar";
                }if (!document.getElementById('temperatura').checked){
                    var levar_produto = "Consumo local";
                }
                if (document.getElementById('acucar-btn').checked){
                    let check_acucar = document.getElementsByName("acucares"); 
                    for (var i=0;i<check_acucar.length;i++){ 
                        if (check_acucar[i].checked == true){ 
                            var acucar_produto = check_acucar[i].value;
                        }  else {
                            // pass
                        }
                    }
                }if (!document.getElementById('acucar-btn').checked){
                    var acucar_produto = "Sem açúcar"
                }
                if(document.getElementById('botao-obs').checked){
                    var observacoes_produto = 'Obs: '+document.getElementById('observacoes').value;
                }if (!document.getElementById('botao-obs').checked){
                    var observacoes_produto = "";
                }

                var pedido = `
                <div class="pedido-section" id="${index}">
                    <div class="d-flex">
                        <h6 class="me-3"><b>${quantidade_produto} ${nome_produto}</h6>
                        <h6 class="ms-auto me-2">${document.getElementById('valor-total').innerHTML}</b></h6>
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
                valor_total = (parseFloat(valor_total) + parseFloat(document.getElementById('valor-total').innerHTML.replace(',', '.'))).toFixed(2)
                document.getElementById('total-pedido').innerHTML = valor_total;
                fechar_produto();
            }
        }else {
            produto.style = 'border: 1px solid var(--marrom-700);';
            document.getElementById('section-venda-acoes').style.display = 'flex';
            document.getElementById('valor-total').innerHTML = produto.children[4].children[1].innerText;
            valor_produto = produto.children[4].children[1].innerText;
            desabilitar_opcoes();
            document.getElementById('adicionar-produto').onclick = function () {
                let nome_produto = produto.children[4].children[0].innerText;
                let quantidade_produto = document.getElementsByName('qty')[0].value;
                var pedido = `
                <div class="pedido-section" id="${index}">
                    <div class="d-flex">
                        <h6><b>${quantidade_produto} ${nome_produto}</h6>
                        <h6 class="ms-auto me-2">${document.getElementById('valor-total').innerHTML}</b></h6>
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
                valor_total = (parseFloat(valor_total) + parseFloat(document.getElementById('valor-total').innerHTML.replace(',', '.'))).toFixed(2)
                document.getElementById('total-pedido').innerHTML = valor_total;
                fechar_produto();
            }
        }
    };
}

function excluir_pedido(index){
    for (let pedido of document.getElementsByClassName('pedido-section')){
        if (pedido.id == index){
            document.getElementById('pedidos-adicionados').removeChild(pedido);
            document.getElementById('input-pedidos-adicionados').value = document.getElementById('pedidos-adicionados').innerHTML;
            valor_total = (valor_total - parseFloat(pedido.children[0].children[1].children[0].innerText.replace(',', '.')).toFixed(2)).toFixed(2);
            document.getElementById('total-pedido').innerHTML = valor_total;
            document.getElementById('input-pedido-valor').value = document.getElementById('total-pedido').innerHTML;
        }
    };

}

const selecionar_acucar = document.getElementById('acucar-btn');
selecionar_acucar.onclick = function () {
    if (selecionar_acucar.checked){
    document.querySelectorAll(".acucar > div > label > input").forEach(inputs => inputs.disabled=false );
    }if (!selecionar_acucar.checked){
        document.querySelectorAll(".acucar > div > label > input").forEach(inputs => inputs.disabled=true );
    }
}

const adicionar_observacao = document.getElementById('botao-obs');
adicionar_observacao.onclick = function () {
    if (adicionar_observacao.checked){
        document.getElementById('observacoes').disabled = false;
    }if (!adicionar_observacao.checked){
        document.getElementById('observacoes').disabled = true;
        document.getElementById('observacoes').value = '';
    }
}

function atualizar_valor(){
    valor = (parseFloat(valor_produto.replace(',', '.'))*(parseInt(document.getElementsByName('qty')[0].value))).toFixed(2)
    document.getElementById('valor-total').innerHTML = valor;
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