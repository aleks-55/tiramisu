function download(data, MIMEtype, filename) {
    let fileData = new Blob([data], { type: MIMEtype })
    let textFileUrl = URL.createObjectURL(fileData)

    let tagA = document.createElement('a')
	tagA.href = textFileUrl
	tagA.download = filename

    console.log('Для отладки: скачиваем файл с помощью тега A')
	console.log(tagA)
	tagA.click()

    URL.revokeObjectURL(textFileUrl);
}

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1) + min) // Максимум и минимум включаются
}
