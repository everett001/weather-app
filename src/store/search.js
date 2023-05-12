import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    mode: "light",
    currentSearch: null,
    searchHistory: []
}

const searchSlice = createSlice({
    name: 'search',
    initialState: initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setSearch: (state, action) => {
            state.currentSearch = action.payload.search;
        },
        addSearch: (state, action) => {
            state.searchHistory.unshift(action.payload.search);
        },
        deleteSearch: (state, action) => {
            state.searchHistory = state.searchHistory.filter(history => history.id !== action.payload);
        }
    }
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;