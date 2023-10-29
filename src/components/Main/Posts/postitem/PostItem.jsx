import {BiComment, BiDotsHorizontalRounded} from 'react-icons/bi'
import {PiArrowFatUpLight, PiArrowFatDownLight, PiShare} from 'react-icons/pi'
import {MdOutlineSaveAlt} from 'react-icons/md'
import './PostItem.css'
import PostComment from './postComment/PostComment'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { useEffect } from 'react'
import {setCommentsTogle, fetchComments, postScoreValueIncrease, postScoreValueDecrease } from '../../../../features/posts/postsSlice'


const PostItem = (props) => {
    const {score, url, id, permalink, title, author, subreddit, num_comments, created_utc, selftext, showingComments, status, comments, errorComments} = props.post
    const timeAgo = moment.unix(created_utc).fromNow()

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(setCommentsTogle(id))
        dispatch(fetchComments({permalink, id}))
    }

    let renderComments; 
    if (status === 'loading') {
        renderComments = <p style={{textAlign: 'center', marginTop: '1rem'}}>Loading...</p>
    } else if (status === 'succeeded' && comments.length > 0) {
        renderComments = comments.map(comment => <PostComment key={comment.id} comment={comment}/>)
    } else if (status === 'succeeded' && comments.length === 0) {
        renderComments = <p className='no--comments'>There are no comments for this post</p>
    } else if (status === 'failed') {
        renderComments = <p className='comments--error'>Cannot retrieve comments from this post.
            <br/>
            Error: {errorComments}</p>
    }
    // console.log(renderComments)
    // console.log(props.post) 
  return (
    <article className='post--with--comments'>
        <div className='post'>
            <div className='post--left'>
                <PiArrowFatUpLight 
                    className='icon arrow arrow-up'
                    onClick={() => dispatch(postScoreValueIncrease(id))}/>
                <p className='score'>{score <= 999 ? score : `${(score / 1000).toFixed(1)}k`}</p>
                <PiArrowFatDownLight 
                    className='icon arrow arrow-down' 
                    onClick={() => dispatch(postScoreValueDecrease(id))}/>
            </div>
            <div className='post--right'>
                <div className='post--info'>  
                    <div className='subreddit--info'>
                        <img src={subreddit}/>
                        <p className='subreddit--link'><Link to={`/r/${subreddit}`}>{subreddit}</Link></p>
                    </div>
                    <p className='author--info'> ~ Posted by <Link to={`/u/${author}`}>{author}</Link> <span className='time--ago'>{timeAgo}</span></p>
                </div>
                <h3><Link to={`/r/${subreddit}/${title}`}>{title}</Link></h3> 
                <img src={url} alt={''} />
                {showingComments && <p className='subreddit--selftext'>{selftext}</p>}
                <div className='post--right--bottom'>
                    <p className='post--bottom--actions'
                        onClick={handleClick}
                    ><BiComment className='icon action-icon'/>{num_comments} Comments</p>
                    <p className='post--bottom--actions'><PiShare className='icon action-icon'/>Share</p>
                    <p className='post--bottom--actions'><MdOutlineSaveAlt className='icon action-icon'/> Save</p>
                    <p className='post--bottom--actions'><BiDotsHorizontalRounded className='icon action-icon'/></p>
                    {showingComments && 
                        <button 
                        className='comments--toggle--button' 
                        onClick={() => dispatch(setCommentsTogle(id))}
                        >Close</button>}    
                </div>
            </div>
        </div>
        <div>
            {showingComments && renderComments}
        </div>
    </article>
  )
}

export default PostItem