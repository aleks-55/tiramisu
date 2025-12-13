function init() {
    for (let u of initDB.users) {
        let user = new User(u.username, u.fullname)
        tiramisuDB.users.push(user)
        document.querySelector('.users').append(user.getDivObject())
    }

    for (let s of initDB.sites) {
        let site = new Site(s.patternUrl)
        tiramisuDB.sites.push(site)
        document.querySelector('.select-sites').append(site.getDivObject())
		document.body.append(site.getStyle())

        for (let u_ of tiramisuDB.users) {
            u_.addIcon(site.siteId, site.patternUrl)
        }
    }
}

const tiramisuDB = {
    sites: [],
    users: [],

    toString(){
        this.sites = this.clearDeleted(this.sites)
        this.users = this.clearDeleted(this.users)
        return JSON.stringify(this, ['sites', 'patternUrl', 'users', 'username', 'fullname'], ' ')
    },

    clearDeleted(arr) {
        let newArr = []

        for (let item of arr) {
            if (item.deleted) continue
            newArr.push(item)
        }
        return newArr
    }
}

init()