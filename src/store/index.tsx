import { createSlice, configureStore } from "@reduxjs/toolkit";
import systemSlice from "./systemSlice";

// BaseType
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


const store = configureStore({
    reducer: {
        system: systemSlice.reducer
    }
})

export default store

