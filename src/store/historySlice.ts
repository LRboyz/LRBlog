import { updateArticleZan } from '@/services/cloudbase'
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export interface historyState {
  articles: string[]
  comments: string[]
}

const initialHistoryState: historyState = {
  articles: [],
  comments: [],
}

const historySlice = createSlice({
  name: 'history',
  initialState: {
    ...initialHistoryState,
  },
  reducers: {
    setInitialHistoryState: (state) => {
    },
    handleLikeArticle: (state, action) => {
      state.articles.push(action.payload)
      Cookies.set('history', { ...state.articles })
    },
    handleLikeComment: (state, action) => {
      state.comments.push(action.payload)
      Cookies.set('comments', { ...state.comments })
    },
  },
})

export const { handleLikeArticle, setInitialHistoryState } = historySlice.actions

export default historySlice
