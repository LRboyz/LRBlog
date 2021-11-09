import { getCommentData, postCommentData, postCommentUserInfo } from '@/services/api/comment'
import { commentType } from '@/types/base'
import { arrayToTree } from '@/utils'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'


export interface userInfoType {
    name?: string
    email?: string
    job?: string
    avatar?: string
}

export interface commentState {
    comment_user_info: userInfoType,
    fetching: boolean,
    comments: commentType[],
    total: number
}

const initialCommentUserInfo = Cookies.getJSON('c_user')
console.log(initialCommentUserInfo, 'initialCommentUserInfo')
const initialCommentState = {
    comment_user_info: initialCommentUserInfo ? initialCommentUserInfo : {},
    fetching: false,
    comments: [],
    total: 0
}


/*********** Async Function  ************/
// 获取评论列表
export const getComments = createAsyncThunk('comment/getCommentList', async (article_id: string) => {
    const res = await getCommentData({
        query: {
            article_id
        }

    })
    return res
})
// 提交评论
export const submitComment = createAsyncThunk('comment/postComment', async (data: any) => {
    return await postCommentData(data)
})


const commentSlice = createSlice({
    name: 'comment',
    initialState: {
        ...initialCommentState
    },
    reducers: {
        setCommentUserInfo: (state, action: any) => {
            Cookies.set('c_user', JSON.stringify(action.payload.comment_author))
            return {
                ...state,
                comment_user_info: {
                    name: action.payload.comment_author.name,
                    email: action.payload.comment_author.email,
                    job: action.payload.comment_author.job,
                    avatar: action.payload.comment_author.avatar
                }
            }
        },
        clearCommentUserInfo: (state) => {
            return {
                ...state,
                comment_user_info: {}
            }
        }
    },
    extraReducers: {
        [getComments.pending.type](state, _) {
            state.fetching = true
        },
        [getComments.fulfilled.type](state, action: any) {
            return {
                ...state,
                fetching: false,
                comments: arrayToTree(action.payload.data),
                total: action.payload.total
            }
        },
        [getComments.rejected.type](state, action: any) {
            return {
                ...state,
                fetching: false,
            }
        },
        [submitComment.pending.type](state, action) {
            state.fetching = true

        },
        [submitComment.fulfilled.type](state, action: any) {
            return {
                ...state,
                feching: false,

            }
        },
        [submitComment.rejected.type](state, action: any) {
            return {
                ...state,
                feching: false,

            }
        },
    }
})

export default commentSlice

export const { setCommentUserInfo } = commentSlice.actions
