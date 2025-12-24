// 
// *** HEADER ***
// 

function hide_nav_list() {
	document.querySelector(".nav .nav_list").classList.add('hide')
}

document.getElementById("nav_btn").addEventListener("click", () => {
	document.querySelector(".nav .nav_list").classList.remove('hide')
});
document.querySelector(".nav .nav_list .mask").addEventListener("click", hide_nav_list),
document.getElementById("close_btn_nav").addEventListener("click", hide_nav_list)

document.getElementById('download_to_file').addEventListener('click', downloadToFile)

async function downloadToFile() {
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

document.getElementById("fileInput").addEventListener("change", changeFileInput)

// открытие файла
function changeFileInput(event) {
	hide_nav_list()

	const file = event.target.files[0]
	if (file) {
		readTiramisuFile(file)
	}
}

function readTiramisuFile(file) {
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

// кнопка "Добавить сайт" в навигационной панели
document.getElementById("nav-btn-add-site").addEventListener("click", () => {
	hide_nav_list()
	document.getElementById('add-site').classList.remove('hidden')
})

// кнопка "Добавить пользователей" в навигационной панели
document.getElementById("nav-btn-add-users").addEventListener("click", () => {
	hide_nav_list()
	document.getElementById('add-users').classList.remove('hidden')
})

// 
// *** формы ADD для добавления пользоватлей и сайтов ***
// 

// свободное место на экране вокруг формы "добавить сайт"
document.querySelector("#add-site .mask").addEventListener("click", () => {
	document.getElementById('add-site').classList.add('hidden')
})

// свободное место на экране вокруг формы "добавить пользователей"
document.querySelector("#add-users .mask").addEventListener("click", () => {
	document.getElementById('add-users').classList.add('hidden')
})

// кнопка "Добавить" в форме "добавить сайт"
document.getElementById("btn-add-site").addEventListener('click', clickBtnAddSite)

// нажатие Enter в поле ввода url
document.getElementById('myUrl').addEventListener('keydown', (e) => {
	(e.code === 'Enter') && clickBtnAddSite()
})

// кнопка "Добавить" в форме "добавить пользователей"
document.getElementById("btn-add-users").addEventListener('click', clickBtnAddUsers)

function clickBtnAddSite() {
	let inputUrl = document.getElementById('myUrl')
	let validity = inputUrl.validity
	if ( !validity.valid ) {
		if (validity.valueMissing) {
			console.log('Заполните поле.')
			alert('Заполните поле.')
			return
		}

		if (validity.patternMismatch) {
			console.log('Url не соответствует шаблону https?://.*TEST.*')
			alert('Url не соответствует шаблону https?://.*TEST.*')
			return
		}
	}

	let url = inputUrl.value
	
	if (tiramisuDB.addSite(url, true)) {
		inputUrl.value = ''
		console.log(url + ' добавлен')
		alert(url + ' добавлен')
	} else {
		console.log('Такой сайт-посредник уже есть на странице (url полностью совпадает).')
		alert('Такой сайт-посредник уже есть на странице (url полностью совпадает).')
	}
}

function clickBtnAddUsers() {
	console.log('добавляем пользователей')
	let initUsers = document.getElementById('myUsers')

	let users = initUsers.value.split('\n')
	let regexpUser = /^@?(\w{1}[\w.]{1,28}\w{1})(\s+(.+)|\s+|)$/
	for (let u of users) {
		// console.log(u)
		let uArr =  u.match(regexpUser)
		if (uArr) {
			let username = uArr[1]
			let fullname = uArr[3]
			// console.log(`username: ${username}\nfullname: ${fullname}`)
			tiramisuDB.addUser(username, fullname, true)
		}
	}
}

// 
// запускаем главный объект - tiramisuDB
// 
const tiramisuDB = new TiramisuDB(initDB)