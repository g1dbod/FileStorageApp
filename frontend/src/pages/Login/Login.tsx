import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import useUserStore from '../../store/UserStore'
import './Login.scss'
const Login = () => {
  const setUser = useUserStore(state => state.setUser)
  const isAuth = useUserStore(state => state.isAuth)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (isAuth) {
    return (<Navigate to={'/account'} />)
  }

  return (
    <div className='Login'>
      <div className="MainBlock">
        <div className="title">Авторизация</div>
        <input type="text" placeholder='Введите email...' value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
        <input type="password" placeholder='Введите пароль...' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
        <button onClick={() => {
          setUser(email, password)
        }}>Авторизация</button>
      </div>
    </div>
  )
}

export default Login