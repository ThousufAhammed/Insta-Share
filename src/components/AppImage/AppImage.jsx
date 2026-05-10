const fallbackColors = {
  avatar: ['#f97316', '#ec4899'],
  illustration: ['#f8fafc', '#bfdbfe'],
  post: ['#14b8a6', '#2563eb'],
}

const sanitizeText = text => (text || 'Image').replace(/[<>&"]/g, '').slice(0, 28)

const createFallbackImage = (alt, variant) => {
  const [startColor, endColor] = fallbackColors[variant] || fallbackColors.post
  const label = sanitizeText(alt)
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">
      <defs>
        <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="${startColor}" />
          <stop offset="100%" stop-color="${endColor}" />
        </linearGradient>
      </defs>
      <rect width="900" height="700" fill="url(#bg)" />
      <circle cx="660" cy="180" r="94" fill="rgba(255,255,255,0.28)" />
      <path d="M110 540 325 335l125 120 95-84 245 169H110Z" fill="rgba(255,255,255,0.5)" />
      <text x="450" y="622" text-anchor="middle" fill="#ffffff" font-family="Arial, sans-serif" font-size="42" font-weight="700">${label}</text>
    </svg>
  `

  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const AppImage = ({alt, fallbackVariant = 'post', onError, ...props}) => {
  const handleError = event => {
    event.currentTarget.onerror = null
    event.currentTarget.src = createFallbackImage(alt, fallbackVariant)

    if (onError) {
      onError(event)
    }
  }

  return <img {...props} alt={alt} onError={handleError} />
}

export default AppImage
