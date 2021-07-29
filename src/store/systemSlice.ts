import { createSlice } from "@reduxjs/toolkit"

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

export default systemSlice