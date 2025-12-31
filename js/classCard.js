class Card {
	deleted = false

	constructor() {
		let card = document.createElement('div')
		card.classList.add('card')
		let divDelete = document.createElement('div')
		card.append(divDelete)
		divDelete.classList.add('delete')
		divDelete.innerHTML = '<span></span><span></span>'
		divDelete.title = 'Удалить'
		divDelete.addEventListener('click', () => {
			this.deleted = true
			this._div.remove()
		})

		this._div = card
	}
		
	getDivObject() {
		return this._div
	}
}


class User extends Card {
	constructor(username, fullname) {
		super()
		this.username = username
		fullname && (this.fullname = fullname)
		
		let user = document.createElement('div')
		user.classList.add('user')
		
		user.innerHTML = `
		<div class="wrapper-icons"></div>
		<div class="username">${username}</div>` +
		(fullname ? `<div class="fullname">${fullname}</div>` : '')

		this._div.append(user)
	}
	
	addIcon(siteId, patternUrl) {
		let link = patternUrl.replace('TEST', this.username)
		let icon = this._createIcon(siteId, link)
		this._div.querySelector(".wrapper-icons").append(icon)
	}

	_createIcon(id, link) {
		let icon = document.createElement('div')
		icon.classList.add('icon', 'icon-' + id)
		if (link) {
			icon.innerHTML = `<a target="_blank" href="${link}"></a>`
		}
		
		return icon
	}

	setFullname(fullname) {
		if (!fullname) {
			console.log('fullname не пределен')
			return false
		}

		this.fullname = fullname
		let divFullname = document.createElement('div')
		divFullname.classList.add('fullname')
		divFullname.innerText = fullname
		this._div.querySelector('.username').after(divFullname)
		return true
	}
}

class Site extends Card {
	constructor(patternUrl) {
		super()
		this.patternUrl = patternUrl
		let url = new URL(patternUrl)
		this.domain = url.hostname.replace(/^www./, '')
		this.siteId = this.domain.replace(/\./g, '_') + '-' + getRandomIntInclusive(1000, 9999)
		
		let site = document.createElement('div')
		site.innerHTML = `
			<label for="${this.siteId}">
				<input type="checkbox" id="${this.siteId}">
				<div class="icon icon-${this.siteId}"></div>
				${this.domain}
			</label>`
			
		let divCheckbox = site.querySelector('[type="checkbox"]')
		divCheckbox.addEventListener('click', this._checkboxClick)
		site.title = patternUrl

		this._div.append(site)

		this._div.querySelector('.delete').addEventListener('click', () => {
			let usersDiv = document.body
			let className = 'visible-' + this.siteId
			usersDiv.classList.remove(className)
		})
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

	_checkboxClick() {
		console.log('нажали на checkbox ' + this.id)
		
		let usersDiv = document.body
		let className = 'visible-' + this.id
		
		if (this.checked) {
			usersDiv.classList.add(className)
		} else {
			usersDiv.classList.remove(className)
		}
	}
}