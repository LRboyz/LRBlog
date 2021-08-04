import { updateArticleZan } from '@/services/cloudbase'
import { createSlice } from '@reduxjs/toolkit'
import Cookies from 'js-cookie'

export type historyState = {
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
    setInitialState: (state) => {
      const initState = Cookies.getJSON('history') || {}
      return {
        ...state,
        articles: initState.articles || [],
        comments: initState.comments || [],
      }
    },
    handleLikeArticle: (state, action) => {
      console.log('执行了Redux里面的方法，参数是:', action)
      state.articles.push(action.payload)
      Cookies.set('history', { ...state })
    },
    handleLikeComment: (state) => {},
  },
})

export const { handleLikeArticle, setInitialState } = historySlice.actions

export default historySlice
