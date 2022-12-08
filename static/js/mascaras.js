$("#id_cpf").keydown(function () {
    try {
        $("#id_cpf").unmask();
    } catch (e) { }

    $("#id_cpf").mask("999.999.999-99");

    // ajustando foco
    var elem = this;
    setTimeout(function () {
        // mudo a posição do seletor
        elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);
    // reaplico o valor para mudar o foco
    var currentValue = $(this).val();
    $(this).val('');
    $(this).val(currentValue);
});

$("#id_telefone").keydown(function () {
    try {
        $("#id_telefone").unmask();
    } catch (e) { }

    $("#id_telefone").mask("(99) 99999-9999");

    // ajustando foco
    var elem = this;
    setTimeout(function () {
        // mudo a posição do seletor
        elem.selectionStart = elem.selectionEnd = 10000;
    }, 0);
    // reaplico o valor para mudar o foco
    var currentValue = $(this).val();
    $(this).val('');
    $(this).val(currentValue);
});