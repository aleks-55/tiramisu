let nav_list = document.querySelector(".nav .nav_list");

function hide_nav_list() {
	console.log('вызов функции hide_nav_list')
	nav_list.classList.add('hide')
}

function visibile_nav_list() {
	console.log('вызов функции visibile_nav_list')
	nav_list.classList.remove('hide')
}

document.querySelector("#nav_btn").addEventListener("click", visibile_nav_list);
document.querySelector(".nav .nav_list .mask").addEventListener("click", hide_nav_list),
document.querySelector("#close_btn_nav").addEventListener("click", hide_nav_list)