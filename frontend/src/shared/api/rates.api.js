export async function fetchRates() {
    const res = await fetch('/api/rates')
    if (!res.ok) throw new Error('Ошибка API')
    return res.json()
}