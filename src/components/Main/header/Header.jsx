import './Header.css'
import {Link} from 'react-router-dom'
import {AiFillBell} from 'react-icons/ai'
import {RiArrowDropDownLine} from 'react-icons/ri'
import {RxAvatar} from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { toggleLinkStatus, getHeaderLinks } from '../../../features/header/headerSlice'
import { getSubredditUrl, fetchPosts } from '../../../features/posts/postsSlice'

const Header = () => {

   
    const getAllHeaderLinks = useSelector(getHeaderLinks)
    const subredditUrl = useSelector(getSubredditUrl)
    const dispatch = useDispatch()
    // console.log(getAllHeaderLinks)
    
    const handleClick = (url, id) => {
        dispatch(fetchPosts(url))
        dispatch(toggleLinkStatus(id))
    }
    const renderedLink = getAllHeaderLinks.map(link => {
        // console.log(link.active)
        return (
            <li key={link.id}
                onClick={() => handleClick(`${subredditUrl}${link.url}`, link.id)}>
                <Link 
                    to={`${subredditUrl}${link.url}`} 
                    className={link.active ? 'active' : 'inactive'}
                >{link.name}</Link>
            </li>
        )
    })
    
  return (
    <header className="header">
        <div className="header--left">
            <ul>
                {renderedLink}
            </ul>
        </div>
        <div className="header--right">
            <AiFillBell className='icon icon--bell'/>
            <span className='message--counter'>3</span>
            <RxAvatar className='icon user--img' />
            <p className='user--name'>{'DM Code'}</p>
            <RiArrowDropDownLine className='icon icon--dropdown'/>
        </div>
    </header>
  )
}

export default Header