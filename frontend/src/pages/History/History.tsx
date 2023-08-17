import React from 'react'
import { Navigate } from 'react-router-dom'
import useUserStore from '../../store/UserStore'

const History = () => {
  const isAuth = useUserStore(state => state.isAuth)
  if (!isAuth) {
    return (<Navigate to={'/login'}/>)
  }

  return (
    <div>History</div>
  )
}

export default History