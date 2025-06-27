import React, { useRef, useState } from 'react'
import dp from '../assets/dp.webp'
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../config';
import { setUserData } from '../redux/userSlice';

function Profile(){
    let {userData}=useSelector(state=>state.user)
    let dispatch=useDispatch()
    let navigate=useNavigate()
    let [name,setName]=useState(userData.name || "")
    let [frontendImage,setFrontendImage]=useState(userData.image || dp)
    let [backendImage, setBackendImage]=useState(null)
    let image=useRef()
    let [saving,setSaving]=useState(false)
    
    const handleImage=(e)=>{
        let file=e.target.files[0]
        setBackendImage(file)
        setFrontendImage(URL.createObjectURL(file))
    }

    const handleProfile = async (e)=>{
        setSaving(true)
        e.preventDefault()
        try{
            let formData=new FormData()
            formData.append("name",name)
            if(backendImage){
                formData.append("image",backendImage)
            }
            let result=await axios.put(`${serverUrl}/api/user/profile`,formData,{withCredentials:true})
            setSaving(false)
            dispatch(setUserData(result.data))
            navigate("/")
        }
        catch(error){
            console.log(error)
            setSaving(false)
        }
    }
    
    return (
        <div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4'>
            {/* Back Button */}
            <div className='fixed top-6 left-6 z-10'>
                <button 
                    className='w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200 hover:scale-105 border border-gray-200'
                    onClick={()=>navigate('/')}
                >
                    <IoIosArrowRoundBack className='w-7 h-7 text-gray-600'/>
                </button>
            </div>

            <div className='w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200'>
                {/* Header Section */}
                <div className='bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-center relative overflow-hidden'>
                    <div className='relative z-10'>
                        <h1 className='text-3xl font-bold text-white mb-2'>Profile</h1>
                        <p className='text-indigo-100 text-sm'>Manage your account</p>
                    </div>
                </div>

                {/* Profile Content */}
                <div className='px-8 py-8'>
                    {/* Profile Image Section */}
                    <div className='flex justify-center mb-8'>
                        <div className='relative cursor-pointer group' onClick={()=>image.current.click()}>
                            <div className='w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-200 shadow-lg group-hover:shadow-xl transition-all duration-200 bg-gray-100'>
                                <img src={frontendImage} alt="" className='w-full h-full object-cover'/>
                            </div>
                            <div className='absolute bottom-2 right-2 w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-200'>
                                <IoCameraOutline className='w-5 h-5 text-white'/>
                            </div>
                        </div>
                    </div>

                    {/* Profile Information */}
                    <div className='space-y-6'>
                        <input type="file" accept='image/*' ref={image} hidden onChange={handleImage}/>
                        
                        {/* Display Name */}
                        <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>Display Name</h3>
                            </div>
                            <input 
                                type="text" 
                                placeholder="Enter your name" 
                                className='w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50/50'
                                onChange={(e)=>setName(e.target.value)} 
                                value={name}
                            />
                        </div>

                        {/* Username Display */}
                        <div className='space-y-3'>
                            <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>Username</h3>
                            <div className='w-full h-12 px-4 border-2 border-gray-100 rounded-xl bg-gray-50 flex items-center'>
                                <span className='text-gray-600 font-medium'>@{userData?.userName}</span>
                            </div>
                        </div>

                        {/* Email Display */}
                        <div className='space-y-3'>
                            <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>Email Address</h3>
                            <div className='w-full h-12 px-4 border-2 border-gray-100 rounded-xl bg-gray-50 flex items-center'>
                                <span className='text-gray-600'>{userData?.email}</span>
                            </div>
                        </div>

                        {/* Save Button */}
                        <button 
                            onClick={handleProfile}
                            className='w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8'
                            disabled={saving}
                        >
                            {saving ? (
                                <div className='flex items-center justify-center'>
                                    <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                                        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                                        <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                                    </svg>
                                    Saving...
                                </div>
                            ) : (
                                'Save Changes'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
