function expandir(concluido){
    if (concluido.ariaExpanded == "true"){
        document.getElementById("section-concluidos").style.width = "260px";
    }if (concluido.ariaExpanded == "false"){
        document.getElementById("section-concluidos").removeAttribute('style');
        for (let div of document.getElementById('section-concluidos').children){ div.children[1].classList.remove("show");div.children[0].ariaExpanded=false;};
    }
}