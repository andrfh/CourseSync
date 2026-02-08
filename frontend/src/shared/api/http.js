import { API_URL } from '../env'

export async function apiFetch(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || 'API error')
  }

  return res.json()
}
