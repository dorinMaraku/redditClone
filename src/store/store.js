import {configureStore } from '@reduxjs/toolkit'
import headerReducer from '../features/header/headerSlice'
import postsReducer from '../features/posts/postsSlice'
import subredditsReducer from '../features/subreddits/subredditsSlice'

export const store = configureStore({
    reducer: {
        header: headerReducer,
        posts: postsReducer,
        subreddits: subredditsReducer,
    }
})  

