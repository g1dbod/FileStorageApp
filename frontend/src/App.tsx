import { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Account from './pages/Account/Account'
import AdminPanel from './pages/AdminPanel/AdminPanel'
import HistoryBlock from './pages/AdminPanel/HistoryBlock/HistoryBlock'
import UsersBlock from './pages/AdminPanel/UsersBlock/UsersBlock'
import Disk from './pages/Disk/Disk'
import History from './pages/History/History'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import useUserStore from './store/UserStore'
import Layout from './widgets/Layout/Layout'

function App() {
  const isAuth = useUserStore(state => state.isAuth)
  const auth = useUserStore(state => state.auth)

  useEffect(()=>{
    auth()
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />

          <Route path='/disk' element={<Disk />} />
          <Route path='/history' element={<History />} />
          <Route path='/account' element={<Account />} />

          <Route path='/admin' element={<AdminPanel />}>
            <Route index element={<Navigate to={'/admin/users'}/>} />
            <Route path='/admin/users' element={<UsersBlock />} />
            <Route path='/admin/history' element={<HistoryBlock />} />
          </Route>

          <Route path='/login' element={<Login />} />

          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
