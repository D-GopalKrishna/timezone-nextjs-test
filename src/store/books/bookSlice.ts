import { createSlice } from '@reduxjs/toolkit'
import {HYDRATE} from 'next-redux-wrapper';

type Book = {
    title: string;
    pages: number;
    languages: string;
}
export type BookStoreType = {
    books: Book[];
}

// Define the initial state using that type
const initialState: BookStoreType = {
    books: [],
};

// Payload Action
interface PayloadAction<T> {
    type: string;
    payload: T;
}

export const bookInfoSlice = createSlice({
    name: 'bookInfo',
    initialState,
    reducers: {
        setupbookInfo: (state: BookStoreType, action: PayloadAction<BookStoreType>) => {
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
