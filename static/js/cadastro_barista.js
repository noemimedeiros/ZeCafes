
{ // Previsualização da foto de perfil
    const campoImg = document.querySelector('#id_foto');
    const previewImg = document.querySelector('#perfil-preview');
    campoImg.onchange = evt => {
        const arquivoImg = campoImg.files;
        if (arquivoImg) {
            previewImg.src = URL.createObjectURL(arquivoImg[0]);
        }
    }
}

{ // Abre o seletor de imagem ao clicar na section
    const inputFoto = document.querySelector('#input_foto');
    const btnReal = document.querySelector('#id_foto');

    inputFoto.addEventListener('click', evento => btnReal.click());
}