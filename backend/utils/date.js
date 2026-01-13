export default function formatDate(date) {
        const formatedDate = new Date(date)
        return formatedDate.toLocaleString('ru-RU', {timeZone: 'Europe/Moscow'})
    }

    
