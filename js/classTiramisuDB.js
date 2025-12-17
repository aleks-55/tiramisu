class TiramisuDB {
    sites = []
    users = []

    constructor(json) {
        for (let u of json.users) {
            this.addUser(u.username, u.fullname, false)
        }

        for (let s of json.sites) {
            this.addSite(s.patternUrl, false)
        }
    }
    
    addDB(json) {
        for (let u of json.users) {
            this.addUser(u.username, u.fullname, true)
        }

        for (let s of json.sites) {
            this.addSite(s.patternUrl, true)
        }
    }

    toString(){
        this.sites = this.sites.filter(a => !a.deleted)
        this.users = this.users.filter(a => !a.deleted)
        return JSON.stringify(this, ['sites', 'patternUrl', 'users', 'username', 'fullname'], ' ')
    }

    addSite(patternUrl, checkForRepeat) {
        if (checkForRepeat) {
            for (let s of this.sites) {
                if (s.deleted) continue
                if (patternUrl === s.patternUrl) return false
            }
        }

        let site = new Site(patternUrl)
        this.sites.push(site)
        document.querySelector('.select-sites').append(site.getDivObject())
        document.body.append(site.getStyle())

        for (let u of this.users) {
            if (u.deleted) continue
            u.addIcon(site.siteId, site.patternUrl)
        }
        return true
    }

    addUser(username, fullname, checkForRepeat){
        if (checkForRepeat) {
            for (let u of this.users) {
                if (u.deleted) continue
                if (username === u.username) {
                    if (!u.fullname && fullname) {
                        u.setFullname(fullname) &&
                        console.log(`UPDATE user ${username}`)
                    } else {
                        console.log(`User ${username} NOT updated.`)
                    }
                    return
                }
            }
        }

        let user = new User(username, fullname)
        this.users.push(user)
        for (let s of this.sites) {
            if (s.deleted) continue
            user.addIcon(s.siteId, s.patternUrl)
        }

        document.querySelector('.users').append(user.getDivObject())
        console.log(`Add user ${username}`)
    }
}