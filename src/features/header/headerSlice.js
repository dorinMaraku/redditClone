import { createSlice } from "@reduxjs/toolkit";

const initialState = [
    {
        name: 'Best',
        url: 'best',
        id: 1,
        active: true
    },
    {
        name: 'Hot',
        url: 'hot',
        id: 2,
        active: false
    },
    {
        name: 'Rising',
        url: 'rising',
        id: 3,
        active: false
    },
    {
        name: 'New',
        url: 'new',
        id: 4,
        active: false
    },
    {
        name: 'Top',
        url: 'top',
        id: 5,
        active: false
    },
]

export const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        toggleLinkStatus: (state, action) => {
            state.filter(link => {
                if(link.id === action.payload) {
                    link.active = true;
                }
                if (link.id !== action.payload) {
                    link.active = false;
                }
            })
        },

    },
})

export const getHeaderLinks = state => state.header
export const {toggleLinkStatus} = headerSlice.actions
export default headerSlice.reducer