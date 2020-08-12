import { request } from "./request"

export const userApi = {
  auth: (data) => request('POST', '/v1/auth', data),
  getTop: () => request('GET', '/v1/top'),
  setScore: (data) => request('POST', '/v1/set-score', data)
}
