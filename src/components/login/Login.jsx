import { getUserInfo } from '../../features/authorization/authorization';
import { Link } from 'react-router-dom';
import './Login.css'

const Login = () => {
  return (
    <div className="signInForm">
        <p className='authRequest'> Please authenticate with your Reddit account: </p>
        <button onClick={() => {getUserInfo()}} 
            className="signIn-btn">
                <Link to={'/'}>Click to authenticate!</Link>
        </button>
    </div>
  )
}

export default Login