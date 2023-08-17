import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import useUserStore from '../../store/UserStore'
import './LeftPanel.scss'

const LeftPanel = () => {
  const user = useUserStore(state => state.user)
  const isAuth = useUserStore(state => state.isAuth)

  useEffect(()=>{

  },[])

  return (
    <div className='LeftPanel'>

      <div className="header">
        <NavLink to={'/'}>SCloud3.0</NavLink>
      </div>

      {isAuth ?
        <div className="auth_true">
          <div className="userinfo">
            <p className='title'>Вы вошли как:</p>
            <p className='fio'> <b> {user.fio} </b></p>
            <p className='email'>email: <b>{user.email}</b></p>
            <p className='role'>роль:<b> {user.role} </b></p>
          </div>

          <ul className="listmenu">
            {['ADMIN', 'GOD'].includes(user.role) && <li><NavLink to={'admin'}>ADMIN</NavLink></li>}
            <li><NavLink to={'disk'}>Disk</NavLink></li>
            <li><NavLink to={'history'}>History</NavLink></li>
          </ul>

          <div className="underground">
            <NavLink to={'/settings'}><span className="material-symbols-outlined">settings</span></NavLink>
            <NavLink to={'/account'}><span className="material-symbols-outlined">account_circle</span></NavLink>
          </div>
        </div>

        :

        <div className="auth_false">
          <div className="userinfo">
            <p>Войдите в ваш аккаунт</p>
            <Link to={'login'}>Авторизация</Link>
          </div>
        </div>
      }





    </div>
  )
}

export default LeftPanel