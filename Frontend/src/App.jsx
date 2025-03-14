import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import Loader from './components/Loader'

function App() {
  const {user,isCheckingAuth,checkAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[])

  if(isCheckingAuth && !user){
    return <Loader/>
  }

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar/>

      <Routes>
        <Route path='/' element={user?<Home/>:<Navigate to='/signin'/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/settings' element={<Settings/>}/>
        <Route path='/profile' element={user?<Profile/>:<Navigate to='/signin'/>}/>
      </Routes>
    </div>
  )
}

export default App
