import React from 'react'
import Sidebar from '../Components/SideBar'
import MessageArea from '../Components/MessageArea'
import { useSelector } from 'react-redux'
import getMessage from '../Hooks/getMessages'

const Home = () => {
    let {selectedUser}=useSelector(state=>state.user)
    getMessage()
  return (
    <div className='w-full h-[100vh] flex overflow-hidden'>
        <Sidebar/>
        <MessageArea/>
    </div>
  )
}

export default Home