let dropArea = document.getElementById('DropArea');
let panelFullscreenDrop = document.getElementById('PanelFullscreenDrop');

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

document.body.addEventListener('dragenter', highlight)

dropArea.addEventListener('drop', handleDrop);

function handleDrop(e) {
    readTiramisuFile(e.dataTransfer.files[0])
}
