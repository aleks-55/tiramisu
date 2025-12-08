class Alfa {
	deleted = false

	constructor() {
		let card = document.createElement('div')
		card.classList.add('card')
		let divDelete = document.createElement('div')
		card.append(divDelete)
		divDelete.classList.add('delete')
		divDelete.addEventListener('click', () => {
			this.deleted = true
			this._div.classList.add('deleted')
		})

		this._div = card
	}
		
	getDivObject() {
		return this._div
	}
}


class User extends Alfa {
	constructor(username, fullname) {
		super()
		this.username = username
		this.fullname = fullname
		
		let user = document.createElement('div')
		user.classList.add('user')
		
		user.innerHTML = `
		<div class="wrapper-icons"></div>
		<div class="username">${username}</div>
		<div class="fullname">${fullname}</div>`

		this._div.append(user)
	}
	
	addIcon(siteId, patternUrl) {
		let link = patternUrl.replace('TEST', this.username)
		let icon = createIcon(siteId, link)
		this._div.querySelector(".wrapper-icons").append(icon)
	}
}

class Site extends Alfa {
	constructor(patternUrl) {
		super()
		this.patternUrl = patternUrl
		let url = new URL(patternUrl)
		this.domain = url.hostname.replace(/^www./, '')
		this.siteId = this.domain.replace(/.[a-z0-9]+$/, '-') + getRandomIntInclusive(1000, 9999)
		
		let site = document.createElement('div')
		site.innerHTML = `
			<label for="${this.siteId}">
				<input type="checkbox" id="${this.siteId}">
				<div class="icon icon-${this.siteId}"></div>
				${this.domain}
			</label>`
			
		site.querySelector('[type="checkbox"]').addEventListener('click', checkboxClick)

		this._div.append(site)
	}

	getStyle() {
		let style = document.createElement('style')
		style.textContent = `
		.icon-${this.siteId} {
			background-image: url(https://www.google.com/s2/favicons?sz=32&domain=${this.domain});
		}
		.visible-${this.siteId} .icon-${this.siteId} {
			display: inline-block;
		}`

		return style
	}

	toString() {
		return this.patternUrl
	}
}

function createIcon(id, link) {
	let icon = document.createElement('div')
	icon.classList.add('icon', 'icon-' + id)
	if (link) {
		icon.innerHTML = `<a target="_blank" href="${link}"></a>`
	}
	
	return icon
}

function checkboxClick() {
	console.log('нажали на checkbox ' + this.id)
	
	let usersDiv = document.body
	let className = 'visible-' + this.id
	
	if (this.checked) {
		usersDiv.classList.add(className)
	} else {
		usersDiv.classList.remove(className)
	}
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); // Максимум и минимум включаются
}