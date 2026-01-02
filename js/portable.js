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
    let arrPromiseCss = [...cssLinks].map(link => {
        return new Promise(async (resolve, reject) => {
            try {
                let url = link.href
                const response = await fetch(url)
                if (!response.ok) {
                    // reject(new Error('Ошибка загрузки файла ' + url))
                    throw new Error('Ошибка загрузки файла ' + url)
                }
                const textCss = await response.text()

                let cssTag = document.createElement('style')
                cssTag.innerHTML = textCss
                cssTag.dataset.file = url
                link.after(cssTag)
                link.remove()

                console.log('Добавили в копию документа внешний файл: ' + url)
                resolve()
            } catch(error) {
                reject(error)
            } 
        })
    })
    
    // JavaScript
    let scriptDB = documentCopy.getElementById('tiramisuJsonFile')
    scriptDB.innerHTML = 'let initDB = ' + tiramisuDB.toString()
    scriptDB.removeAttribute('src')

    // <script src="...">
    let scripts = documentCopy.querySelectorAll('script[src]')
    let arrPromiseScripts = [...scripts].map(tagScript => {
        return new Promise(async (resolve, reject) => {
            try {
                let url = tagScript.src
                const response = await fetch(url)
                if (!response.ok) {
                    // reject(new Error('Ошибка загрузки файла ' + url))
                    throw new Error('Ошибка загрузки файла ' + url)
                }
                let textScript = await response.text()

                tagScript.innerHTML = textScript
                tagScript.removeAttribute('src')
                tagScript.dataset.file = url
                console.log('Добавили в копию документа внешний файл: ' + url)

                resolve()
            } catch(error) {
                reject(error)
            } 
        })
    })

    // favicon
    let promiseFavicon = new Promise(async (resolve, reject) => {
        let elementFavicon = documentCopy.querySelector('link[rel="shortcut icon"]')
        elementFavicon.href = await urlToBase64(elementFavicon.href)
        console.log('Вставили base64 favicon')
        resolve()
    })
    

    // logo
    let promiseLogo = new Promise(async (resolve, reject) => {
        let elementLogo = documentCopy.querySelector('div.logo img')
        elementLogo.src = await urlToBase64(elementLogo.src)
        console.log('Вставили base64 логотипа')
        resolve()
    })
    
    documentCopy.body.setAttribute('portable', 'true')

    await Promise.all([...arrPromiseCss, ...arrPromiseScripts, promiseFavicon, promiseLogo])
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