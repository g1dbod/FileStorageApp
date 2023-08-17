import React, { PropsWithChildren } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'
import useUserStore from '../../store/UserStore'
import HistoryBlock from './HistoryBlock/HistoryBlock'
import UsersBlock from './UsersBlock/UsersBlock'
import './AdminPanel.scss'

const AdminPanel = (props: PropsWithChildren) => {
    const role = useUserStore(state => state.user.role)
    const isAuth = useUserStore(state => state.isAuth)

    if (!isAuth && !['ADMIN', 'GOD'].includes(role)) {
        return (<Navigate to={'/account'} />)
    }

    return (
        <div className='AdminPanel'>
            <div className="tabs">
                <NavLink to={'/admin/users'}>Пользователи</NavLink>
                <NavLink to={'/admin/history'}>История</NavLink>
            </div>
            <div className="content">
                <Outlet/>
            </div>
        </div>
    )
}

export default AdminPanel