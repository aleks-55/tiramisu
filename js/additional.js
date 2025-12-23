function download(data, MIMEtype, filename) {
    let fileData = new Blob([data], { type: MIMEtype })
    let textFileUrl = URL.createObjectURL(fileData)

    let tagA = document.createElement('a')
	tagA.href = textFileUrl
	tagA.download = filename

    console.log('Скачиваем файл с помощью тега A')
	console.log(tagA)
	tagA.click()

    URL.revokeObjectURL(textFileUrl);
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min) // Максимум и минимум включаются
}

// '2025.12.24-09.38.52'
function getDate() {
    let d = new Date()
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let date = d.getDate()
    let hour = d.getHours()
    let minute = d.getMinutes()
    let second = d.getSeconds()

    month = toTwoDigits(month)
    date = toTwoDigits(date)
    hour = toTwoDigits(hour)
    minute = toTwoDigits(minute)
    second = toTwoDigits(second)

    return `${year}.${month}.${date}-${hour}.${minute}.${second}`

    function toTwoDigits(number) {
        return ((number < 10) ? '0' : '') + number
    }
}