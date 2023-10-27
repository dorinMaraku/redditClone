import React from 'react'
import './Layout.css'

import SidebarNav from '../sidebarNav/SidebarNav'
import Main from '../Main/Main'

const Layout = () => {
  return (
    <div className='App'> 
      <SidebarNav />
      <Main /> 
    </div>
  )
}

export default Layout