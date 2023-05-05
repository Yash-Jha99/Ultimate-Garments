import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: { darkMode: false },
    reducers: {
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode
        },
        initializeMode: (state, payload) => {
            state = payload
        }
    }
});

export const { toggleDarkMode, initializeMode } = themeSlice.actions
export default themeSlice.reducer