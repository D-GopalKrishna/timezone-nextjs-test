import { configureStore, combineReducers, ThunkAction, Store } from '@reduxjs/toolkit'
import {Action} from 'redux';
import { HYDRATE, createWrapper } from 'next-redux-wrapper'

export interface State {
    tick: string;
}

// All the local reducers
import bookReducer from './books/bookSlice'

// const combinedReducer = combineReducers({
//     bookReducer,
// });


// const masterReducer = (state, action) => {
//     if (action.type === HYDRATE) {
//         const newState = {
//             ...state, // use previous state
//             ...action.addBook, 
//         }
//         return newState
//     }else{
//         state = state
//         return combinedReducer(state, action)
//     }
// }


export const makeStore = () =>
    configureStore({
        reducer: {
            bookStore: bookReducer
        },
        devTools: true,
    })

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<Store<State>>(makeStore, { debug: true });
// export const selectSubject = (id: any) => (state: AppState) => state?.[subjectSlice.name]?.[id];
