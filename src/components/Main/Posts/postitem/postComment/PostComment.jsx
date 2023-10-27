import React from 'react'
import './PostComment.css'
import { Link } from 'react-router-dom'
import {PiArrowFatUpLight, PiArrowFatDownLight, PiShare} from 'react-icons/pi'
import {BiDotsHorizontalRounded} from 'react-icons/bi'
import {VscReply} from 'react-icons/vsc'
import moment from 'moment'
import { useDispatch } from 'react-redux'

const PostComment = ({comment}) => {
    const dispatch = useDispatch()

    // console.log(comment)
    const timeAgo = moment.unix(comment.created_utc).fromNow()
    let showCommentReplies
    if (comment.replies) {
        const commentReplies = comment.replies?.data.children.map(replies => replies.data)
        showCommentReplies = commentReplies.map(comment => <PostComment key={comment.id} comment={comment}/>)
    }
    return (
    <article className='comment'>
        <div className='comment--header'>
            <img src={comment.link_id} />
            <p><Link>{comment.author}</Link> ~ {timeAgo} </p>
        </div>
        <div className='comment--body'>
            <p>{comment.body}</p>
        </div>
        <div className='comment--footer'>
            <div className='comment--footer--left'>
                <PiArrowFatUpLight className='arrow arrow-up'/>
                <p className='score'>{comment.score}</p>
                <PiArrowFatDownLight className='arrow arrow-down' />
            </div>
            <div className='comment--footer--right'>
                <p className='comment--footer--actions'><VscReply className='action--icon action--icon--one'/>Reply</p>
                <p className='comment--footer--actions'><PiShare className='action--icon action--icon--two'/>Share</p>
                <p className='comment--footer--actions'><BiDotsHorizontalRounded className='action--icon action--icon--three'/></p>
            </div>
        </div>
        <div>
            {showCommentReplies}
        </div>
    </article>
  )
}

export default PostComment