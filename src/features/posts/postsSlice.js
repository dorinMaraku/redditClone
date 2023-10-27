import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const API_ROOT = 'https://www.reddit.com'


const initialState = {
    posts: [],
    status: 'idle', // 'loading' | 'succeeded' | 'failed'
    error: null,
    searchTerm: '',
    subredditUrl: '/r/home/',
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (subredditUrl) => {
    try {
        const response = await fetch(`${API_ROOT}${subredditUrl}.json`)
        .then(response => response.json());
        // console.log(response.data.children)
        return response.data.children.map(post => post.data)
    } catch (error) {
        return error.message
    }
})

export const fetchComments = createAsyncThunk('posts/fetchComments', async ({permalink, id}) => {
    try {
        const response = await fetch(`${API_ROOT}${permalink}.json`)
        .then(response => response.json())
        // console.log(response[1].data.children.map(comment => comment.data))
        return response[1].data.children.map(comment => comment.data)
    } catch (error) {
        return error.message
    }
})

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setSubredditUrl: (state, action) => {
            state.subredditUrl = action.payload;
            // console.log(action.payload)
            state.status = 'idle'
        },
        setCommentsTogle: (state, action) => {
            state.posts.filter(post => {
                if (post.id === action.payload) {
                    post.showingComments = !post.showingComments
                }
                // console.log(post.showingComments)
            })
        },
        postScoreValueIncrease: (state, action) => {
            state.posts.filter(post => {
                if (post.id === action.payload) {
                    post.score += 1
                }
            })
        },
        postScoreValueDecrease: (state, action) => {
            state.posts.filter(post => {
                if (post.id === action.payload) {
                    post.score -= 1
                }
            })
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.posts = action.payload.map(post => ({
                ...post,
                showingComments: false,
                comments: [],
                status: 'idle', // 'loading' | 'succeeded' | 'failed'
                errorComments: null,
            }))
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(fetchComments.pending, (state, action) => {
            state.posts.filter((post) => {
                if(!post.showingComments) return 
                if (post.id === action.meta.arg.id) { 
                    post.status = 'loading'
                };
                // console.log(post.showingComments, post.status, 'post is loading', action.meta.arg.id, action)
            })
        })
        .addCase(fetchComments.fulfilled, (state, action) => {
            state.posts.filter(post => {
                if(!post.showingComments) return;
                if (post.id === action.meta.arg.id){
                    post.status = 'succeeded';
                    post.comments = action.payload
                }
                // console.log(post.comments, post.status, action.payload)
            })
        })
        .addCase(fetchComments.rejected, (state, action) => {
            state.posts.filter(post => {
                if (!post.showingComments) return
                if (post.id === action.meta.arg.id) {
                    post.status = 'failed';
                    post.errorComments = action.error.message;
                }
                // console.log(post.errorComments, post.status, 'smth went wrong')
                console.log(action)
            })
        })
    }
})

export const { setCommentsTogle, setSubredditUrl, postScoreValueIncrease, postScoreValueDecrease } = postSlice.actions 
export const getSubredditUrl = state => state.posts.subredditUrl
export const getAllPosts = state => state.posts.posts
export const getPostsStatus = state => state.posts.status
export const getPostsError = state => state.posts.error 

export default postSlice.reducer