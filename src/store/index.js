import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from './rootReducer'

export const store = configureStore({ reducer: rootReducer })

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', async () => {
    const newRootReducer = (await import('./rootReducer')).rootReducer
    store.replaceReducer(newRootReducer)
  })
}
