import Cookies from "js-cookie"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { useDarkreader } from 'react-darkreader'
import { postRegisterForm } from "@/services/api/user"

export type userInfoType = {
    username: string
    email: string
    phone: number
    user_avatar: string
    nickname: string
}

export interface systemState {
    isDark: boolean
    userInfo: userInfoType
    isLogin: boolean
}

const initialSystemState = {
    isDark: false,
    userInfo: {},
    isLogin: false
}


const systemSlice = createSlice({
    name: 'system',
    initialState: {
        ...initialSystemState
    },
    reducers: {
        setUserInfo: (state, action: any) => {
            return {
                ...state,
                userInfo: action,
                isLogin: true
            }
        },
        clearUserInfo: (state) => {
            return {
                ...state,
                isLogin: false,
                userInfo: {}
            }
        }
    },
})

export default systemSlice

export const { setUserInfo, clearUserInfo } = systemSlice.actions