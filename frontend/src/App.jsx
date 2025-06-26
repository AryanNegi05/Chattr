import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import SignUp from './Pages/Login'
import getCurrentUser from './Hooks/getCurrentUser'
import { useDispatch, useSelector } from 'react-redux'
import Profile from './Pages/Profile'
import Home from './Pages/Home'
import getOtherUsers from './Hooks/getOtherUsers'
import { io } from "socket.io-client"
import { serverUrl } from './config'
import { setOnlineUsers, setSocket } from './redux/userSlice'
function App(){
  getCurrentUser()
  getOtherUsers()
  let{userData, socket, onlineUsers}=useSelector(state=>state.user)
  let dispatch=useDispatch()
  useEffect(()=>{
    if(userData){
        const socketio=io(`${serverUrl}`,{
        query:{
          userId:userData?._id
        }
      })
      dispatch(setSocket(socketio))

      socketio.on("getOnlineUsers",(users)=>{
        dispatch(setOnlineUsers(users))
      })
      
      return ()=>socketio.close()
    }
    else{
      if(socket){
        socket.close()
        dispatch(setSocket(null))
      }
    }
    
  },[userData])
  return (
    <Routes>
      <Route path='/login'  element={!userData?<Login/>:<Navigate to="/"/>}/>
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to="/profile"/>}/>
      <Route path='/' element={userData?<Home/>:<Navigate to="/login"/>}/>
      <Route path='/profile' element={userData?<Profile/>:<Navigate to="/signup"/>}/>
    </Routes>
  )
}

export default App