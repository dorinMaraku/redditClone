import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_ROOT = 'https://www.reddit.com'

export const fetchSubreddits = createAsyncThunk('subreddits/fetchSubreddits', async () => {
    try {
        const response = await fetch(`${API_ROOT}/subreddits.json`)
        .then(response => response.json());
        // console.log(response.data.children)
        return response.data.children.map(subreddit => subreddit.data);  
    } catch (error) {
      return error.message
    }
})

const initialState = {
    subreddits: [],
    status: 'idle', // 'loading' | 'succeeded' | 'failed'
    error: null,
    searchTerm: '',
}

export const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState,
    reducers: {
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchSubreddits.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchSubreddits.fulfilled, (state, action) => {
            state.status = 'succeeded'
            // console.log(action.payload) 
            state.subreddits = action.payload
        })
        .addCase(fetchSubreddits.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message 
        })
    }
})

export const {setSearchTerm} = subredditsSlice.actions
export const getAllSubredits = state => state.subreddits.subreddits
export const getSubreditsStatus = state => state.subreddits.status
export const getSubreditsError = state => state.subreddits.error
export default subredditsSlice.reducer