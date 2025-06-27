import React, { useEffect, useState } from 'react'
import { IoIosArrowRoundBack } from "react-icons/io";
import dp from '../assets/dp.webp'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa6";
import { RiSendPlane2Fill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import EmojiPicker from 'emoji-picker-react'
import SenderMessage from './SenderMessage';
import ReceiverMessage from './RecieverMessage';
import { serverUrl } from '../config';
import { useRef } from 'react';
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';

function MessageArea() {
    let navigate=useNavigate()
    let {selectedUser,userData,socket}=useSelector(state=>state.user)
    let dispatch=useDispatch()
    let [showPicker, setShowPicker]=useState(false)
    let [input,setInput]=useState("")
    let [frontendImage,setFrontendImage]=useState(null)
    let [backendImage,setBackendImage]=useState(null)
    let image=useRef()
    let {messages}=useSelector(state=>state.message)
    
    const handleImage=(e)=>{
        let file=e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleSendMessage=async (e)=>{
        e.preventDefault()
        if(input.length==0 && backendImage==null){
            return
        }
        try{
            let formData=new FormData()
            formData.append("message",input)
            if(backendImage){
                formData.append("image",backendImage)
            }
            let result=await axios.post(`${serverUrl}/api/message/send/${selectedUser._id}`,formData,{withCredentials: true})
            dispatch(setMessages([...messages,result.data]))
            console.log(result.data)
            setInput("")
            setFrontendImage(null)
            setBackendImage(null)
        }
        catch(error){
            console.log(error)
        }
    }
    
    const onEmojiClick = (emojiData)=>{
        setInput(prevInput=>prevInput+emojiData.emoji)
        setShowPicker(false)
    }

    useEffect(()=>{
        socket.on("newMessage",(mess)=>{
            dispatch(setMessages([...messages,mess]))
        })
        return ()=>socket.off("newMessage")
    },[messages,setMessages])

    return (
        <div className={`lg:w-[70%] ${selectedUser?"flex":"hidden"} lg:flex w-full h-full bg-gradient-to-br from-slate-50 to-gray-100`}>
            {selectedUser && 
            <div className='w-full h-full flex flex-col'>
                {/* Header */}
                <div className='w-full h-[70px] bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg gap-4 flex items-center px-6 flex-shrink-0'>
                    <button 
                        className='p-2 hover:bg-white/10 rounded-full transition-colors duration-200' 
                        onClick={()=>dispatch(setSelectedUser(null))}
                    >
                        <IoIosArrowRoundBack className='w-6 h-6 text-white'/>
                    </button>
                    <div className='w-10 h-10 rounded-full overflow-hidden flex justify-center items-center bg-white/20 backdrop-blur-sm cursor-pointer shadow-md hover:shadow-lg transition-all duration-200' onClick={()=>navigate("/profile")}>
                        <img src={selectedUser?.image || dp} alt="" className='h-full w-full object-cover'/>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-white font-semibold text-lg'>{selectedUser?.name||"user"}</h1>
                        <span className='text-white/70 text-sm'>Online</span>
                    </div>
                </div>

                {/* Messages Area */}
                <div className='flex-1 flex flex-col py-4 px-4 overflow-auto gap-4 relative min-h-0'>
                    {showPicker && 
                        <div className='absolute bottom-4 left-4 z-50'>
                            <EmojiPicker width={300} height={400} onEmojiClick={onEmojiClick}/>
                        </div>
                    }
                    <div className='flex-1 space-y-4 pb-4'>
                        {messages && messages.map((mess, index)=>(
                            <div key={index}>
                                {mess.sender==userData._id
                                    ? <SenderMessage image={mess.image} message={mess.message}/>
                                    : <ReceiverMessage image={mess.image} message={mess.message}/>
                                }
                            </div>
                        ))}
                    </div>
                </div>

                {/* Message Input */}
                <div className='w-full px-4 pb-4 flex-shrink-0'>
                    {frontendImage && 
                        <div className='mb-3 flex justify-end'>
                            <div className='relative bg-white p-2 rounded-lg shadow-lg max-w-xs'>
                                <img src={frontendImage} alt="" className='w-20 h-20 object-cover rounded-lg'/>
                                <button 
                                    className='absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs hover:bg-red-600 transition-colors flex items-center justify-center'
                                    onClick={() => {setFrontendImage(null); setBackendImage(null)}}
                                >
                                    ×
                                </button>
                            </div>
                        </div>
                    }
                    <form className='w-full h-14 bg-white border border-gray-200 shadow-lg rounded-full flex items-center gap-3 px-4' onSubmit={handleSendMessage}>
                        <button 
                            type="button"
                            className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0'
                            onClick={()=>setShowPicker(prev=>!prev)}
                        >
                            <RiEmojiStickerLine className='w-5 h-5 text-gray-600'/>
                        </button>
                        
                        <input type="file" accept='image/*' ref={image} hidden onChange={handleImage}/>
                        
                        <input 
                            type="text" 
                            placeholder='Type a message...' 
                            className='flex-1 h-full text-gray-800 bg-transparent placeholder-gray-500 outline-none' 
                            onChange={(e)=>setInput(e.target.value)} 
                            value={input}
                        />
                        
                        <button 
                            type="button"
                            className='p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0'
                            onClick={()=>image.current.click()}
                        >
                            <FaImages className='w-5 h-5 text-gray-600'/>
                        </button>
                        
                        {(input.length>0 || backendImage!=null) && 
                            <button 
                                type="submit"
                                className='p-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-full transition-all duration-200 shadow-md hover:shadow-lg flex-shrink-0'
                            >
                                <RiSendPlane2Fill className='w-5 h-5 text-white'/>
                            </button>
                        }
                    </form>
                </div>
            </div>
            }
            
            {/* Welcome Screen */}
            {!selectedUser && 
                <div className='w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-purple-50'>
                    <div className='text-center space-y-4'>
                        <div className='w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg'>
                            <span className='text-white text-2xl font-bold'>C</span>
                        </div>
                        <h1 className='text-gray-800 font-bold text-4xl'>Welcome to Chatly</h1>
                        <p className='text-gray-600 text-lg'>Select a conversation to start chatting</p>
                    </div>
                </div>
            }
        </div> 
    )
}

export default MessageArea
