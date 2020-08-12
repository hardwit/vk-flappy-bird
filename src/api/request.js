import queryString from 'query-string'
import { HOST } from '../constants'

const defaultHeaders = {
  // 'Access-Control-Allow-Origin': '*',
  Accept: 'application/json',
}

export const request = async (method, url, data, options) => {
  const uri = `${options?.host || HOST}${createUrl(method, url, data)}`
  const token = await getToken()

  const headers = new Headers({
    ...defaultHeaders,
    ...createContentType(method),
    ...createTokenHeader(token),
    ...options?.headers
  })

  const config = new Request(uri, {
    method,
    headers,
    body: createBody(method, data)
  })

  return fetch(config)
    .then(response => response.json())
    .then(response => {
      if (response.error) {
        throw response
      }

      return response
    })
}

const createContentType = (method) => {
  if (method !== 'GET') {
    return { "Content-Type": 'application/json' }
  }

  return null
}

const createTokenHeader = (token) => 
  token ? { 'x-auth-token': `${token}` } : null

const getToken = async () => {
  const token = localStorage.getItem('token')

  return token
}

const createBody = (method, data)=> {
  if (method !== 'GET' && data) {
    return JSON.stringify(data)
  }

  return undefined
}

const createUrl = (method, url, data) => {
  if (method === 'GET' && data) {
    return `${url}?${queryString.stringify(data)}`
  }

  return url
}
