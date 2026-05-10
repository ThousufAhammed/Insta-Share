import Cookies from 'js-cookie'
import {cookieName} from './constants.js'
import {fetchFromMockApi, loginWithMockApi} from './mockApi.js'

const apiBase = '/api'

export const getJwtToken = () => Cookies.get(cookieName)

const isMockToken = token => token === 'mock-jwt-token'

export const fetchWithAuth = async (path, options = {}) => {
  const jwtToken = getJwtToken()
  if (isMockToken(jwtToken)) {
    return fetchFromMockApi(path, options)
  }

  let response
  try {
    response = await fetch(`${apiBase}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    })
  } catch {
    throw new Error('Unable to reach the server. Please check your connection.')
  }

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error_msg || 'Something went wrong')
  }
  return data
}

export const loginUser = async credentials => {
  const isDemoLogin = credentials.username === 'demo' || credentials.password === 'demo123'
  if (isDemoLogin) {
    return loginWithMockApi(credentials)
  }

  let response
  try {
    response = await fetch(`${apiBase}/login`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(credentials),
    })
  } catch {
    throw new Error('Unable to reach the server. Please check your connection.')
  }

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error_msg || 'Invalid credentials')
  }
  return data
}
