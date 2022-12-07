function expandir(concluido){
    if (concluido.ariaExpanded == "true"){
        document.getElementById("section-concluidos").style.width = "250px"
    }if (concluido.ariaExpanded == "false"){
        document.getElementById("section-concluidos").removeAttribute('style')
    }
}

