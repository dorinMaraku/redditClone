import { Routes, Route} from 'react-router-dom'
import './App.css'
import Layout from "./components/Layout/Layout";
import SidebarNav from './components/sidebarNav/SidebarNav'
import Main from './components/Main/Main'


function App() {


  return (
    <>
    <div className='container'> 
      <Layout/>
      {/* <Routes>
        <Route path='/login' element={<Login />} /> 
        <Route path='/' element={<Layout />}/>
      </Routes> */}
    </div>
    </>
  )
}

export default App
