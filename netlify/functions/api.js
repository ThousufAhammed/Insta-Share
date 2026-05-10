export const handler = async event => {
  const apiPath = event.path.replace(/^\/\.netlify\/functions\/api/, '')
  const query = event.rawQuery ? `?${event.rawQuery}` : ''
  const targetUrl = `https://apis.ccbp.in${apiPath}${query}`

  try {
    const response = await fetch(targetUrl, {
      method: event.httpMethod,
      headers: {
        Authorization: event.headers.authorization || '',
        'Content-Type': event.headers['content-type'] || 'application/json',
      },
      body: ['GET', 'HEAD'].includes(event.httpMethod) ? undefined : event.body,
    })

    const body = await response.text()

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
      },
      body,
    }
  } catch {
    return {
      statusCode: 502,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({error_msg: 'Unable to reach the API server'}),
    }
  }
}
