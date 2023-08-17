import React, { PropsWithChildren } from 'react'
import {Outlet} from 'react-router-dom'
import LeftPanel from '../LeftPanel/LeftPanel'
import  './Layout.scss'

const Layout = (props: PropsWithChildren) => {
  return (
    <div className={'Layout'}>
      <div className="Left"><LeftPanel/></div>
      <div className="Right"><Outlet/></div>
        
        
    </div>
  )
}

export default Layout