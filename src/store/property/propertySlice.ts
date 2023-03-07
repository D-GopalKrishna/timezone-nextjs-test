import { createSlice } from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper';
// import AppAPI from '../../lib/api';

const initialState = {
    books: {},
}

export const bookInfoSlice = createSlice({
    name: 'bookInfo',
    initialState,
    reducers: {
        setupbookInfo: (state: any, action: any) => {
            console.log('setupbookInfo', state, action.payload);
            let response = action.payload
            state.books = response.books
        },
    },
    extraReducers: {
        [HYDRATE]: (state: any, action: any) => {
            console.log('HYDRATE', action.payload);
            if (action.payload.bookStore.books) {
                const newbookList = action.payload.bookStore.books
                return {
                    ...state,
                    books: newbookList,
                };
            }
            return {
                ...state,
            };
        },
    },
})


// Action creators are generated for each case reducer function
export const { setupbookInfo } = bookInfoSlice.actions

export default bookInfoSlice.reducer
