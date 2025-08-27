/**
 * Преобразует URL изображения с сервера в локальный путь для использования с rewrite
 * @param serverUrl - URL изображения с сервера (например, http://localhost:1337/uploads/image.jpg)
 * @returns Локальный путь для использования с rewrite (например, /upload/image.jpg)
 */
export const getLocalImageUrl = (serverUrl: string | undefined): string => {
  if (!serverUrl) return ''
  
  // Если URL уже локальный (начинается с /), возвращаем как есть
  if (serverUrl.startsWith('/')) {
    return serverUrl
  }
  
  // Извлекаем путь после /uploads/ или /upload/
  const uploadsMatch = serverUrl.match(/\/uploads?\/(.+)$/)
  if (uploadsMatch) {
    return `/upload/${uploadsMatch[1]}`
  }
  
  // Если не удалось извлечь путь, возвращаем исходный URL
  return serverUrl
}
