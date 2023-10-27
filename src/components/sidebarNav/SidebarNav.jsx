import { FiSearch }  from 'react-icons/fi'
import { FaRedditAlien } from 'react-icons/fa6'
import './SidebarNav.css'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getAllSubredits, getSubreditsStatus, getSubreditsError, fetchSubreddits } from '../../features/subreddits/subredditsSlice'
import { setSubredditUrl, fetchPosts } from '../../features/posts/postsSlice'
import { useState, useEffect } from 'react'


const SidebarNav = () => {
    const dispatch = useDispatch()
    const subreddits = useSelector(getAllSubredits)
    const subredditsStatus = useSelector(getSubreditsStatus)
    const error = useSelector(getSubreditsError)
    const [searchTerm, setSearchTerm] = useState('') 

    useEffect(() => {
        if (subredditsStatus === 'idle'){
            dispatch(fetchSubreddits())
        }
    }, [subredditsStatus, dispatch])
    
    const handleChange = (e) => {
        e.preventDefault()
        setSearchTerm(e.target.value)
    }

    const filteredSubreddits = subreddits.filter(subreddit => {
        if (searchTerm === '') {
            return subreddit
        }
        return subreddit.display_name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    // console.log(filteredItems.map(reddit => reddit.display_name))
    // console.log(subreddits)
    let renderedSubreddits;
    if (subredditsStatus === 'loading') {
        renderedSubreddits = <p>Loading...</p>
    } else if (subredditsStatus === 'succeeded') {
        renderedSubreddits = filteredSubreddits.map(subreddit => { 
            return (
                <li key={subreddit.id}
                    onClick={() => dispatch(setSubredditUrl(subreddit.url))}>
                    <img 
                        src={subreddit.icon_img} 
                        className='subreddit--icon--image' 
                        alt='subreddit icon image'
                        style={{border: `3px solid ${subreddit.primary_color}` }}/>
                    <p><Link to={subreddit.url}>{subreddit.display_name}</Link></p>
                </li>
            )
        })
    } else if (subredditsStatus === 'failed') {
        renderedSubreddits = <p>{error}</p>
    }
    
    const sideMenus = [
        {
            to: '/r/popular/',
            text: 'Popular' 
        },
        {
            to: '/r/all/',
            text: 'All' 
        },
        {
            to: '/r/random/',
            text: 'Random' 
        }
    ]
    const renderedMenu = sideMenus.map(menu => {
        return (
        <li 
            key={menu.to}
            onClick={() => dispatch(fetchPosts(menu.to))}   
            className='sidenav--menu' 
        >
            <Link to={menu.to}>{menu.text}</Link>
        </li>
        )
    })

  return (
    <div className='sidenav'>
        <div className='sidenav--logo'
        onClick={() => dispatch(fetchPosts('/r/pics/'))}>
            <FaRedditAlien className='sidenav--reddit--icon'/>
            <h1 className='sidenav--logo--text' >reddit<span className='sidenav--span-text'>Clone</span></h1>
        </div>
        <form className='sidenav--search'>
            <input 
                id='searchbar' 
                className='sidenav--search--input' 
                type='text' 
                placeholder='Search Reddit...' 
                onChange={handleChange}/>
            <FiSearch className='sidenav--search--btn' />
        </form>
        <div className='sidenav--links'>
            <ul className='sidenav--menu'> 
                {renderedMenu}
            </ul>
            <hr/>
            <h2>Subreddits</h2>
            <ul className='sidenav--subreddit'>
                {renderedSubreddits}
            </ul>
        </div>
    </div>
  )
}

export default SidebarNav