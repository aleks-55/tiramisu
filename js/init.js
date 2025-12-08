function init() {
    for (let u of initDB.users) {
        let user = new User(u.username, u.fullname || '')
        tiramisuDB.users.push(user)
        document.querySelector('.users').append(user.getDivObject())
    }

    for (let s of initDB.sites) {
        let site = new Site(s)
        tiramisuDB.sites.push(site)
        document.querySelector('.select-sites').append(site.getDivObject())
		document.body.append(site.getStyle())

        for (let u_ of tiramisuDB.users) {
            u_.addIcon(site.siteId, site.patternUrl)
        }
    }
}

const tiramisuDB = {sites: [], users: []}

init()