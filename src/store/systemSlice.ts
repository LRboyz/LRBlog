import Cookies from "js-cookie"
import { createSlice } from "@reduxjs/toolkit"
import { useDarkreader } from 'react-darkreader'

export type systemState = {
    isDark: boolean
}

const initialSystemState = {
    isDark: false
}

const systemSlice = createSlice({
    name: 'system',
    initialState: {
        ...initialSystemState
    },
    reducers: {
        setTheme: (state, action) => {
            // const initTheme = Cookies.getJSON('isDark') || action
            // state.isDark = !initTheme
            // // toggle()
            // return {
            //     ...state,
            // }
            // const [isDark] = useDarkreader(initialSystemState.isDark)
            // state.isDark = !isDark
            // Cookies.set("isDark", JSON.stringify(state.isDark))
            // return {
            //     ...state
            // }
        }
    }
})

export default systemSlice

export const { setTheme } = systemSlice.actions