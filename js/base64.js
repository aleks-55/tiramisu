// функция загружает файл по сети (по url),
// возвращает его в виде строки формата base64
async function urlToBase64(url, targetElement, targetAttribute) {
    try {
        // 1. Загружаем изображение через fetch
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Ошибка загрузки: ${response.statusText}`);
        }

        // 2. Преобразуем в Blob
        const blob = await response.blob();

        const strBase64 = await readFile(blob)
        return strBase64
    } catch (error) {
        console.error('Ошибка:', error);
    }
}

function readFile(blob) {
    return new Promise((resolve, reject) => {
        // 3. Читаем Blob как Data URL (Base64)
        let reader = new FileReader();
        reader.readAsDataURL(blob);
        // 4. Ждём завершения чтения
        reader.onload = () => {
            // 5. Получаем результат
            resolve(reader.result)
        };
        reader.onerror = reject;
    });
}