import React, { useEffect, useRef } from 'react'
import dp from '../assets/dp.webp'
import { useSelector } from 'react-redux'

function ReceiverMessage({image, message}) {
    let scroll = useRef()
    let {selectedUser} = useSelector(state => state.user)
    
    useEffect(() => {
        scroll?.current.scrollIntoView({behavior: "smooth"})
    }, [message, image])
    
    const handleImageScroll = () => {
        scroll?.current.scrollIntoView({behavior: "smooth"})
    }
    
    return (
        <div className='flex items-start gap-3 max-w-[85%]' ref={scroll}>
            {/* Avatar */}
            <div className='w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm flex-shrink-0'>
                <img src={selectedUser?.image || dp} alt="" className='w-full h-full object-cover'/>
            </div>
            
            {/* Message Bubble */}
            <div className='flex flex-col gap-2 max-w-full'>
                <div className='bg-white border border-gray-200 rounded-2xl rounded-tl-md shadow-sm px-4 py-3 max-w-md'>
                    {image && (
                        <div className='mb-2'>
                            <img 
                                src={image} 
                                alt="" 
                                className='max-w-full h-auto rounded-lg shadow-sm cursor-pointer hover:shadow-md transition-shadow duration-200' 
                                onLoad={handleImageScroll}
                            />
                        </div>
                    )}
                    {message && (
                        <p className='text-gray-800 text-base leading-relaxed break-words'>
                            {message}
                        </p>
                    )}
                </div>
                
                {/* Timestamp */}
                <span className='text-xs text-gray-400 px-2'>
                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </span>
            </div>
        </div>
    )
}

export default ReceiverMessage
