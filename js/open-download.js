async function downloadTiramisu() {
	hide_nav_list()
	let data = await createPortableTiramisu()
	if ( ! data ) {
		console.log('Не удалось сохранить страницу. Посетите https://aleks-55.github.io/tiramisu/')
		alert('Не удалось сохранить страницу. Посетите https://aleks-55.github.io/tiramisu/')
		return
	}
	let mimeType = 'text/html'
	let filename = 'tiramisu-' + getDate() + '.html'

	download(data, mimeType, filename)
}

function readTiramisuFile(file) {
	if (file.type !== "text/html") {
		console.error('Ошибка: данный файл не является HTML.')
		return
	}

	const reader = new FileReader()
	reader.onload = (e) => {
		let data
		try {
			let htmlText = e.target.result
			let newDocument = new DOMParser().parseFromString(htmlText, 'text/html')
			let elemDB = newDocument.getElementById('tiramisuJsonFile')
			let str = elemDB.innerHTML.replace('let initDB = ', '')
			data = JSON.parse(str)
		} catch (error) {
			console.error("Error parsing HTML or JSON: ", error)
			return
		}
		console.log('JSON of file:')
		console.log(data)
		tiramisuDB.addDB(data)
	}
	reader.readAsText(file)
}