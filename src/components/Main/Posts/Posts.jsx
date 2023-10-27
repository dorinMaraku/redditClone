import './Posts.css'
import PostItem from './postitem/PostItem'
import { useSelector, useDispatch } from 'react-redux'
import { getAllPosts, getPostsStatus, getPostsError, fetchPosts, getSubredditUrl } from '../../../features/posts/postsSlice'
import { useEffect } from 'react'
// import { getUserInfo, data } from '../../../features/authorization/authorization'
 

const Posts = () => {
    const dispatch = useDispatch();
    const posts = useSelector(getAllPosts)
    const postsStatus = useSelector(getPostsStatus)
    const error = useSelector(getPostsError)
    const selectedSubredditUrl = useSelector(getSubredditUrl)
    
    
    useEffect(() => {
      if (postsStatus === 'idle') {
        dispatch(fetchPosts(selectedSubredditUrl))
      }
    },[dispatch, postsStatus, selectedSubredditUrl])
    // console.log(posts)

    let renderedPosts;
    if (postsStatus === 'loading') {
      renderedPosts = <p>Loading...</p>
    } else if (postsStatus === 'succeeded') {
      renderedPosts = posts.map((post, index) => {
        return (
          <PostItem key={post.id} post={post}/>
        )
      })
    } else if (postsStatus === 'failed') {
      renderedPosts = <p>{error}</p>
    }

  return (
    <div className='posts'>
        {renderedPosts}
    </div>
  )
}

export default Posts