import { configureStore } from '@reduxjs/toolkit'
import commentSlice from './commentSlice'
import articleSlice from './articleSlice'
import historySlice from './historySlice'


// BaseType
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: {
    article: articleSlice.reducer,
    comment: commentSlice.reducer,
    history: historySlice.reducer,
  }
})

export default store
