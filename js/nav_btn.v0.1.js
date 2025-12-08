let nav_btn = document.querySelector("#nav_btn");
nav_btn.addEventListener("click", (e) => {
	let nav_list = document.querySelector(".nav .nav_list");
	if ("block" === window.getComputedStyle(nav_list).display)
		nav_list.classList.add('hide')
	else {
		nav_list.classList.remove('hide')
		/*function n(e) {
			console.log('вызов функции n')
			nav_btn.contains(e.target) || nav_list.contains(e.target) || (nav_list.style.display = "none",
			document.removeEventListener("click", n))
		};*/
		function hide() {
			console.log('вызов функции hide')
			nav_list.classList.add('hide')
		}
		//document.addEventListener("click", n),
		document.querySelector(".nav .nav_list .mask").addEventListener("click", hide),
		document.querySelector("#close_btn_nav").addEventListener("click", hide)
	}
	e.stopPropagation()
});