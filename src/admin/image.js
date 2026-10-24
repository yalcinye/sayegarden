// Yüklemeden önce fotoğrafı küçültür ve sıkıştırır; telefondan gelen 5-10 MB'lık
// fotoğraflar ~200-400 KB'a iner, site hızlı açılır.
const toBlob = (canvas, type, quality) => new Promise((resolve) => canvas.toBlob(resolve, type, quality))

export async function resizeImage(file, max = 1600, quality = 0.85) {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  const scale = Math.min(1, max / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale)
  canvas.height = Math.round(bitmap.height * scale)
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  bitmap.close?.()
  // WebP'yi desteklemeyen tarayıcılar PNG döndürür; o durumda JPEG'e geç.
  let blob = await toBlob(canvas, 'image/webp', quality)
  if (!blob || blob.type !== 'image/webp') blob = await toBlob(canvas, 'image/jpeg', quality)
  if (!blob) throw new Error('Görsel dönüştürülemedi')
  return blob
}
