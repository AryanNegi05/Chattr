import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from '../assets/dp.webp'
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import axios from 'axios';
import { serverUrl } from '../config';
import { setOtherUsersData, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    let navigate = useNavigate()
    let {userData,otherUsers,selectedUser,onlineUsers,searchData} = useSelector(state=>state.user)
    let [search,setSearch]=useState(false)
    let [input,setInput]=useState("")
    let dispatch=useDispatch()
    
    const handleLogOut = async ()=>{
        try{
            let result=await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
            dispatch(setUserData(null))
            dispatch(setOtherUsersData(null))
            navigate("/login")
        }
        catch(error){
            console.log(error)
        }
    }
    
    const handleSearch = async ()=>{
        try{
            let result=await axios.get(`${serverUrl}/api/user/search?query=${input}`,{withCredentials:true})
            dispatch(setSearchData(result.data))
            console.log(result.data)
        }
        catch(error){
            console.log(error)
            dispatch(setSearchData([]));
        }
    }
    
    useEffect(()=>{
        if(input){
            handleSearch()
        }
    },[input])
    
    return (
<div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block bg-gradient-to-br from-slate-50 to-gray-100 ${!selectedUser?"block":"hidden"} border-r border-gray-200 relative`}>
            {/* Logout Button */}
            <button 
                className='w-12 h-12 rounded-full overflow-hidden flex justify-center items-center bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg cursor-pointer fixed bottom-6 left-6 z-50 transition-all duration-200 hover:scale-105' 
                onClick={handleLogOut}
            >
                <BiLogOutCircle className='w-6 h-6 text-white'/>
            </button>

            {/* Search Results Overlay */}
            {/* {input.length > 0 && (
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-br from-slate-50 to-gray-100 z-40 flex flex-col'>
                    <div className='p-4 border-b border-gray-200'>
                        <h3 className='text-lg font-semibold text-gray-800 mb-2'>Search Results</h3>
                    </div>
                    <div className='flex-1 overflow-y-auto px-4 py-2 bg-gradient-to-br from-slate-50 to-gray-100'>
                        {searchData?.length > 0 ? (
                            <div className='space-y-2'>
                                {searchData.map((user) => (
                                    <div
                                        key={user?._id}
                                        className='w-full p-3 flex items-center gap-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors duration-200 border border-gray-100'
                                        onClick={() => {
                                            dispatch(setSelectedUser(user));
                                            setInput('');
                                            setSearch(false);
                                        }}
                                    >
                                        <div className='relative'>
                                            <div className='w-12 h-12 rounded-full overflow-hidden bg-gray-100'>
                                                <img src={user?.image || dp} alt="" className='w-full h-full object-cover'/>
                                            </div>
                                            {onlineUsers?.includes(user?._id) && (
                                                <span className='w-3 h-3 rounded-full absolute -bottom-0.5 -right-0.5 bg-green-500 border-2 border-white'></span>
                                            )}
                                        </div>
                                        <h1 className='text-gray-800 font-medium text-base'>{user?.name || user?.userName}</h1>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className='flex flex-col items-center justify-center py-12'>
                                <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                                    <IoIosSearch className='w-8 h-8 text-gray-400'/>
                                </div>
                                <p className='text-gray-500 text-base font-medium'>No users found</p>
                                <p className='text-gray-400 text-sm'>Try searching with different keywords</p>
                            </div>
                        )}
                    </div>
                </div>
            )} */}

            {/* Search Results Overlay */}
{input.length > 0 && (
    <div className='absolute top-56 left-0 right-0 bottom-0 bg-gradient-to-br from-slate-50 to-gray-100 z-40 flex flex-col border-t border-gray-200'>
        <div className='p-3 border-b border-gray-200'>
            <h3 className='text-base font-semibold text-gray-800'>Search Results</h3>
        </div>
        <div className='flex-1 overflow-y-auto px-3 py-2'>
            {searchData?.length > 0 ? (
                <div className='space-y-1'>
                    {searchData.map((user) => (
                        <div
                            key={user?._id}
                            className='w-full p-2.5 flex items-center gap-3 hover:bg-white/60 rounded-lg cursor-pointer transition-colors duration-200 border border-gray-100/50'
                            onClick={() => {
                                dispatch(setSelectedUser(user));
                                setInput('');
                                setSearch(false);
                            }}
                        >
                            <div className='relative'>
                                <div className='w-10 h-10 rounded-full overflow-hidden bg-gray-100'>
                                    <img src={user?.image || dp} alt="" className='w-full h-full object-cover'/>
                                </div>
                                {onlineUsers?.includes(user?._id) && (
                                    <span className='w-2.5 h-2.5 rounded-full absolute -bottom-0.5 -right-0.5 bg-green-500 border border-white'></span>
                                )}
                            </div>
                            <h1 className='text-gray-800 font-medium text-sm truncate'>{user?.name || user?.userName}</h1>
                        </div>
                    ))}
                </div>
            ) : (
                <div className='flex flex-col items-center justify-center py-8'>
                    <div className='w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mb-3'>
                        <IoIosSearch className='w-6 h-6 text-gray-400'/>
                    </div>
                    <p className='text-gray-500 text-sm font-medium'>No users found</p>
                    <p className='text-gray-400 text-xs'>Try different keywords</p>
                </div>
            )}
        </div>
    </div>
)}
            

            {/* Header Section */}
            <div className='w-full h-56 bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-lg flex flex-col justify-center px-6 relative overflow-hidden'>
                {/* Background Pattern */}
                
                
                <div className='relative z-10'>
                    <h1 className='text-white font-bold text-2xl mb-4'>Chatly</h1>
                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <h2 className='text-white font-semibold text-lg'>Hi, {userData?.name || "User"}!</h2>
                            <p className='text-white/80 text-sm'>Ready to chat?</p>
                        </div>
                        <div className='w-12 h-12 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105' onClick={()=>navigate("/profile")}>
                            <img src={userData?.image || dp} alt="" className='w-full h-full object-cover'/>
                        </div>
                    </div>
                    
                    {/* Search and Online Users */}
                    <div className='flex items-center gap-3'>
                        {!search ? (
                            <>
                                <button 
                                    className='w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 hover:bg-white/30'
                                    onClick={()=>setSearch(true)}
                                >
                                    <IoIosSearch className='w-5 h-5 text-white'/>
                                </button>
                                
                                {/* Online Users Horizontal Scroll */}
                                <div className='flex items-center gap-2 overflow-x-auto flex-1 scrollbar-hide'>
                                    {otherUsers?.map((user)=>(
                                        onlineUsers?.includes(user._id) && 
                                        <div key={user._id} className='relative flex-shrink-0'>
                                            <div 
                                                className='w-10 h-10 rounded-full overflow-hidden bg-white/20 backdrop-blur-sm cursor-pointer shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105' 
                                                onClick={()=>dispatch(setSelectedUser(user))}
                                            >
                                                <img src={user.image || dp} alt="" className='w-full h-full object-cover'/>
                                            </div>
                                            <span className='w-3 h-3 rounded-full absolute -bottom-0.5 -right-0.5 bg-green-400 border-2 border-white shadow-sm'></span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className='w-full h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center gap-3 px-4 shadow-md'>
                                <IoIosSearch className='w-4 h-4 text-white/70'/>
                                <input 
                                    type="text" 
                                    placeholder='Search users...' 
                                    className='flex-1 h-full bg-transparent text-white placeholder-white/70 outline-none text-sm' 
                                    onChange={(e)=>setInput(e.target.value)} 
                                    value={input}
                                    autoFocus
                                />
                                <button 
                                    type="button"
                                    className='p-1 hover:bg-white/20 rounded-full transition-colors flex-shrink-0'
                                    onClick={()=>{
                                        setSearch(false);
                                        setInput("");
                                        dispatch(setSearchData([]));
                                    }}
                                >
                                    <RxCross2 className='w-4 h-4 text-white/70'/>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Conversations List */}
            <div className='flex-1 overflow-y-auto px-4 py-4'>
                <h3 className='text-gray-800 font-semibold text-sm uppercase tracking-wide mb-3 px-2'>Conversations</h3>
                <div className='space-y-1'>
                    {otherUsers?.map((user)=>(
                        <div 
                            key={user._id}
                            className={`w-full p-3 flex items-center gap-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-gray-50 ${selectedUser?._id === user._id ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200' : 'hover:shadow-sm'}`}
                            onClick={()=>dispatch(setSelectedUser(user))}
                        >
                            <div className='relative'>
                                <div className='w-12 h-12 rounded-full overflow-hidden bg-gray-100 shadow-sm'>
                                    <img src={user.image || dp} alt="" className='w-full h-full object-cover'/>
                                </div>
                                {onlineUsers?.includes(user._id) && (
                                    <span className='w-3 h-3 rounded-full absolute -bottom-0.5 -right-0.5 bg-green-500 border-2 border-white shadow-sm'></span>
                                )}
                            </div>
                            <div className='flex-1 min-w-0'>
                                <h2 className='text-gray-800 font-medium text-base truncate'>{user.name || user.userName}</h2>
                                <p className='text-gray-500 text-sm'>
                                    {onlineUsers?.includes(user._id) ? 'Online' : 'Offline'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {otherUsers?.length === 0 && (
                    <div className='flex flex-col items-center justify-center py-12'>
                        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4'>
                            <span className='text-gray-400 text-xl'>💬</span>
                        </div>
                        <p className='text-gray-500 text-base font-medium'>No conversations yet</p>
                        <p className='text-gray-400 text-sm'>Start chatting with someone!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Sidebar
