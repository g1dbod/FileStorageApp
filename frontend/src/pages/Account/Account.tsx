import React from 'react'
import { Navigate } from 'react-router-dom'
import useUserStore from '../../store/UserStore'
import './Account.scss'

const Account = () => {
  const user = useUserStore(state => state.user)
  const setLogout = useUserStore(state => state.setLogout)

  const isAuth = useUserStore(state => state.isAuth)
  if (!isAuth) {
    return (<Navigate to={'/login'}/>)
  }

  return (
    <div className='Account'>
      <div className="MainBlock">
        <div className="info">
        <p className="title">Ваш профиль</p>
        <p className="id">id: {user.id}</p>
        <p className="fio">ФИО: {user.fio}</p>
        <p className="email">email: {user.email}</p>
        <p className="role">Роль: {user.role}</p>
        <p className="phone">Телефон: {user.phone}</p>
        <p className="space">Space: {user.usedSpace}/{user.maxSpace}</p>
        </div>
        
        <button onClick={() => {
          setLogout()
        }}>Выйти из аккаунта</button>
      </div>
    </div>
  )
}

export default Account