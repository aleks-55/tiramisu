// место сброса
let dropArea = document.getElementById('DropArea');
// сама панель - со всеми элементами, текстом
let panelFullscreenDrop = document.getElementById('PanelFullscreenDrop');

// начинаем показывать панель
document.body.addEventListener('dragenter', (e) => {
    // если перетаскиваемый элемент — файл
    if (e.dataTransfer.types.indexOf('Files') !== -1) {
        highlight()
    }
});

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults)
});

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}

['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight)
});
['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight)
});

function highlight(e) {
    panelFullscreenDrop.classList.add('visible')
}
function unhighlight(e) {
    panelFullscreenDrop.classList.remove('visible')
}

dropArea.addEventListener('drop', handleDrop);

function handleDrop(e) {
    readTiramisuFile(e.dataTransfer.files[0])
}