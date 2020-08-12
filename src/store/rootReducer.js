import { combineReducers } from 'redux'
import { reducer as gameReducer } from './gameSlice'
import { reducer as userReducer } from './userSlice'

export const rootReducer = combineReducers({
  game: gameReducer,
  user: userReducer
})

export default rootReducer
