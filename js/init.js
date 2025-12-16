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

function downloadToFile() {
	hide_nav_list()

	let data = tiramisuDB.toString()
	let MimeType = 'application/json'
	let filename = 'tiramisuDB'

	download(data, MimeType, filename)
}

document.getElementById("fileInput").addEventListener("change", changeFileInput, Event)
	
function changeFileInput(event) {
	hide_nav_list()

	const file = event.target.files[0]
	if (file) {
		const reader = new FileReader()
		reader.onload = (e) => {
			try {
				const data = JSON.parse(e.target.result);
				console.log(data)
				tiramisuDB.addDB(data)
			} catch (error) {
				console.error("Error parsing JSON:", error)
			}
		}
		reader.readAsText(file)
	}
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
document.getElementById('myURL').addEventListener('keydown', (e) => {
	(e.code === 'Enter') && clickBtnAddSite()
})

function clickBtnAddSite() {
	let inputUrl = document.getElementById('myURL')
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

// 
// запускаем главный объект - tiramisuDB
// 
const tiramisuDB = new TiramisuDB(initDB)