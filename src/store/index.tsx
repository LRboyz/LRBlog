import { createSlice, configureStore } from '@reduxjs/toolkit'
import systemSlice from './systemSlice'
import articleSlice from './articleSlice'
import historySlice from './historySlice'

// BaseType
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: {
    article: articleSlice.reducer,
    system: systemSlice.reducer,
    history: historySlice.reducer,
  },
})

export default store
