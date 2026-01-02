// функция возвращает промис, который далее возвращает строку -
// содержимое html-файла Tiramisu Portable
async function createPortableTiramisu() {
    // =========================================
    // ==== Для portable версии
    if (document.querySelector('body[portable="true"]')) {
        let documentCopy = new DOMParser().parseFromString(document.documentElement.innerHTML, 'text/html')
        clearDocument(documentCopy)

        // обновляем базу данных в portabe файле
        documentCopy.getElementById('tiramisuJsonFile').innerHTML = 'let initDB = ' + tiramisuDB.toString()

        return documentToString(documentCopy)
    }

    // =========================================
    // ==== Для версии на ПК
    if (location.protocol == 'file:') return null

    // =========================================
    // ==== Для версии на веб-сервере
    let response = await fetch(location.href)
    if ( !response.ok) {
        console.error('Ошибка при загрузке страницы ' + location.href)
        return
    }
    let text = await response.text()
    console.log('Загрузили страницу: ' + location.href)
    let documentCopy = new DOMParser().parseFromString(text, 'text/html')

    // CSS
    // <link rel="stylesheet" href="https://example.com/file.css" type="text/css">
    let cssLinks = documentCopy.querySelectorAll('link[rel="stylesheet"]')
    for (let link of cssLinks) {
        let url = link.href
        let response = await fetch(url)
        let textCss = await response.text()

        let cssTag = document.createElement('style')
        cssTag.innerHTML = textCss
        cssTag.dataset.file = url
        documentCopy.head.append(cssTag)
        link.remove()
        console.log('Добавили в копию документа внешний файл: ' + url)
    }

    // JavaScript
    let scriptDB = documentCopy.getElementById('tiramisuJsonFile')
    scriptDB.innerHTML = 'let initDB = ' + tiramisuDB.toString()
    scriptDB.removeAttribute('src')

    // <script src="...">
    let scripts = documentCopy.querySelectorAll('script[src]')
    for (let script of scripts) {
        let url = script.src

        let response = await fetch(url)
        let textScript = await response.text()

        script.innerHTML = textScript
        script.removeAttribute('src')
        script.dataset.file = url
        console.log('Добавили в копию документа внешний файл: ' + url)
    }

    // favicon
    let elementFavicon = documentCopy.querySelector('link[rel="shortcut icon"]')
    elementFavicon.href = await urlToBase64(elementFavicon.href)
    console.log('Вставили base64 favicon')

    // logo
    let elementLogo = documentCopy.querySelector('div.logo img')
    elementLogo.src = await urlToBase64(elementLogo.src)
    console.log('Вставили base64 логотипа')
    
    documentCopy.body.setAttribute('portable', 'true')
    return documentToString(documentCopy)
}

function documentToString(doc) {
    return `<!DOCTYPE html><html>
            ${doc.documentElement.innerHTML}
            </html>`
}

function clearDocument(doc) {
    doc.querySelectorAll('.card').forEach(el => el.remove())
    doc.querySelectorAll('body style').forEach(el => el.remove())
}