import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  token: localStorage.getItem('token') || null,
  score: 0
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setScore: (state, action) => {
      state.score = action.payload
    },
    setToken: (state, action) => {
      localStorage.setItem('token', action.payload)
      state.token = action.payload
    }
  }
})

export const { actions, reducer } = userSlice