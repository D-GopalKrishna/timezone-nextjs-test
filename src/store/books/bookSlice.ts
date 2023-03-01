import { createSlice } from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper';

const initialState = {
    books: {},
}

export const bookInfoSlice = createSlice({
    name: 'bookInfo',
    initialState,
    reducers: {
        setupbookInfo: (state, action) => {
            let response = action.payload
            state.books = response.books
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            console.log('HYDRATE', state, action.payload);
            return {
                ...state,
                ...action.payload.books
            };
        },
    },
})


// Action creators are generated for each case reducer function
export const { setupbookInfo } = bookInfoSlice.actions

export default bookInfoSlice.reducer
