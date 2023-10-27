import { FaRedditAlien } from 'react-icons/fa6'
import { FiSearch }  from 'react-icons/fi'
import {Link} from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  
  return (
    <nav className="nav-container">
        <div className='nav-logo'> 
            <FaRedditAlien className='reddit-icon'/>
            <h1 className='nav-logo-text' >reddit<span className='nav-clone-text'>Clone</span></h1>
        </div>
        <div className='nav-searchbar'>
            <form className='input-form'>
                <FiSearch className='search-btn' />
                <input id='serachbar' className='search-input' type='text' placeholder='Search Reddit' />
            </form>
        </div>
        <div className='login-btn-container'> 
          <button
            className='login-btn' 
          ><Link to='/login' className='login-link'>Login</Link></button>
        </div>  
    </nav>
  )
}
export default Navbar