let nav_list = document.querySelector(".nav .nav_list");

function hide_nav_list() {
	console.log('вызов функции hide_nav_list')
	nav_list.classList.add('hide')
}

function visibile_nav_list() {
	console.log('вызов функции visibile_nav_list')
	nav_list.classList.remove('hide')
}

document.getElementById("nav_btn").addEventListener("click", visibile_nav_list);
document.querySelector(".nav .nav_list .mask").addEventListener("click", hide_nav_list),
document.getElementById("close_btn_nav").addEventListener("click", hide_nav_list)

document.getElementById('download_to_file').addEventListener('click', () => {
	hide_nav_list()

	let data = tiramisuDB.toString()
	let MimeType = 'application/json'
	let filename = 'tiramisuDB'

	download(data, MimeType, filename)
})

document.getElementById("fileInput").addEventListener("change", function (event) {
	hide_nav_list()

	const file = event.target.files[0];
	if (file) {
		const reader = new FileReader();
		reader.onload = function (e) {
			try {
				const data = JSON.parse(e.target.result);
				console.log(data)
			} catch (error) {
				console.error("Error parsing JSON:", error);
			}
		};
		reader.readAsText(file);
	}
});

document.getElementById("btn-add-site").addEventListener("click", () => {
	hide_nav_list()
	document.getElementById('add-site').classList.remove('hidden')
})

document.querySelector("#add-site .mask").addEventListener("click", () => {
	document.getElementById('add-site').classList.add('hidden')
})

document.getElementById("btn-add-users").addEventListener("click", () => {
	hide_nav_list()
	document.getElementById('add-users').classList.remove('hidden')
})

document.querySelector("#add-users .mask").addEventListener("click", () => {
	document.getElementById('add-users').classList.add('hidden')
})