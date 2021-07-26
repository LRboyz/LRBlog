import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useDarkreader } from "react-darkreader";
import Cookies from "js-cookie";

const systemSlice = createSlice({
    name: 'system',
    initialState: {
        // isDark: false
    },
    reducers: {
        // changeTheme: state => {
        //     const isDark = Cookies.getJSON("isDark")
        //     // const [isDark, { toggle }] = useDarkreader();
        //     console.log(isDark, "通過Redux獲取的")
        //     state.isDark = !state.isDark
        // }
    }
})

// export const { changeTheme } = systemSlice.actions

const store = configureStore({
    reducer: systemSlice.reducer
})

export default store