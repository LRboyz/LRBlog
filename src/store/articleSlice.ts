import { getArticleList, getArticleListByCategory } from '@/services/api/article'
import { articleType } from '@/types/base'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface articleState {
  isLoading: boolean
  list: articleType[]
  total: number
}

export const articleInitState: articleState = {
  isLoading: false,
  list: [],
  total: 0,
}

 /*********** Async Function  ************/
export const getArticles = createAsyncThunk('article/getArticleList', async (params: any) => {
  const res = await getArticleList(params)
  return res
})

export const getArticlesByCategory = createAsyncThunk(
  '/article/getArticleListByCategory',
  async (data: any) => {
    const res = await getArticleListByCategory(data)
    return res
  }
)

export const getMoreArticles = createAsyncThunk('article/getMoreArticles', async (params: any) => {
  const res = await getArticleList(params)
  console.log('获取更多后的文章结果:', res)
  return res
})

export const getMoreArticlesByCategory = createAsyncThunk(
  'article/getMoreArticles',
  async (data: any) => {
    const res = await getArticleListByCategory(data)
    console.log('获取更多文章结果(基于分类的):', res)
    return res
  }
)
/******************************************/

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    ...articleInitState,
  },
  reducers: {},
  extraReducers: {
    /****** 直接请求文章列表 (Tips: action即后端返回的数据) ******/
    [getArticles.pending.type](state, action: any) {
      state.isLoading = true
    },
    [getArticles.fulfilled.type](state, action: any) {
      return {
        isLoading: false,
        list: action.payload.data,
        total: action.payload.total,
      }
    },
    [getArticles.rejected.type](state, action: any) {
      return {
        isLoading: false,
        list: [],
      }
    },
    /****** 根据分类请求文章列表 (Tips: action即后端返回的数据) ******/
    [getArticlesByCategory.pending.type](state, action: any) {
      state.isLoading = true
    },
    [getArticlesByCategory.fulfilled.type](state, action: any) {
      return {
        isLoading: false,
        list: action.payload.data,
        total: action.payload.total,
      }
    },
    [getArticlesByCategory.rejected.type](state, action: any) {
      return {
        isLoading: false,
        list: [],
      }
    },
    [getMoreArticles.fulfilled.type](state, action: any) {
      return {
        ...state,
        list: state.list.concat(action.payload.data),
      }
    },
    [getMoreArticlesByCategory.fulfilled.type](state, action: any) {
      return {
        ...state,
        list: state.list.concat(action.payload.data),
      }
    },
  },
})

export default articleSlice
