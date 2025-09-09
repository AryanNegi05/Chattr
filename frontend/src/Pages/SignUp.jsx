import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverUrl } from '../config'
import { setUserData } from '../redux/userSlice'
import { useDispatch, useSelector } from 'react-redux'

function SignUp() {
  let navigate = useNavigate()
  let [show, setShow] = useState(false)
  let [userName, setUserName] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let [loading, setLoading] = useState(false)
  let [err, setErr] = useState("")
  let dispatch = useDispatch()
  let { userData } = useSelector(state => state.user)
  
  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      console.log(userName, email, password);
      let result = await axios.post(`${serverUrl}/api/auth/signup`, { userName, email, password }, { withCredentials: true })
      dispatch(setUserData(result.data))
      navigate("/profile")
      setUserName("")
      setEmail("")
      setPassword("")
      setLoading(false)
      setErr("")
    }
    catch (error) {
      console.log(error)
      setLoading(false)
      setErr(error?.response?.data?.message)
    }
  }
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-2xl animate-pulse delay-500'></div>
      </div>

      <div className='w-full max-w-md bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50 relative z-10 animate-in fade-in-0 slide-in-from-bottom-4 duration-700'>
        {/* Header Section */}
        <div className='bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-center relative overflow-hidden'>
          
          
          <div className='relative z-10 animate-in fade-in-0 slide-in-from-top-4 duration-1000 delay-300'>
            <div className='w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm border border-white/30 animate-in zoom-in-0 duration-500 delay-700'>
              <svg className='w-8 h-8 text-white animate-pulse' fill='currentColor' viewBox='0 0 20 20'>
                <path fillRule='evenodd' d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z' clipRule='evenodd' />
              </svg>
            </div>
            <h1 className='text-3xl font-bold text-white mb-2 animate-in slide-in-from-left-4 duration-700 delay-500'>Join Chattr</h1>
            <p className='text-indigo-100 text-sm animate-in slide-in-from-right-4 duration-700 delay-700'>Create your account to get started</p>
          </div>
        </div>

        {/* Form Section */}
        <div className='px-8 py-8'>
          <form className='space-y-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-500' onSubmit={handleSignUp}>
            {/* Username Input */}
            <div className='space-y-3 animate-in slide-in-from-left-4 duration-500 delay-700'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>Username</h3>
              </div>
              <input 
                type="text" 
                placeholder='Enter your username' 
                className='w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transform focus:scale-[1.02]'
                onChange={(e) => setUserName(e.target.value)} 
                value={userName}
                required
              />
            </div>

            {/* Email Input */}
            <div className='space-y-3 animate-in slide-in-from-right-4 duration-500 delay-800'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>Email Address</h3>
              </div>
              <input 
                type="email" 
                placeholder='Enter your email' 
                className='w-full h-12 px-4 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transform focus:scale-[1.02]'
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                required
              />
            </div>

            {/* Password Input */}
            <div className='space-y-3 animate-in slide-in-from-left-4 duration-500 delay-900'>
              <h3 className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>Password</h3>
              <div className='relative'>
                <input 
                  type={show ? "text" : "password"} 
                  placeholder='Enter your password' 
                  className='w-full h-12 px-4 pr-12 border-2 border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 outline-none transition-all duration-200 text-gray-800 placeholder-gray-400 bg-gray-50/50 hover:bg-gray-50 focus:bg-white transform focus:scale-[1.02]'
                  onChange={(e) => setPassword(e.target.value)} 
                  value={password}
                  required
                />
                <button
                  type="button"
                  className='absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-indigo-500 transition-all duration-200 hover:scale-110 focus:scale-110 outline-none'
                  onClick={() => setShow(prev => !prev)}
                >
                  {show ? (
                    <svg className='w-5 h-5 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21' />
                    </svg>
                  ) : (
                    <svg className='w-5 h-5 transition-transform duration-200' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z' />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {err && (
              <div className='bg-red-50 border border-red-200 rounded-xl p-4 animate-in slide-in-from-top-2 duration-300'>
                <p className='text-red-600 text-sm flex items-center'>
                  <svg className='w-4 h-4 mr-2 animate-pulse' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z' clipRule='evenodd' />
                  </svg>
                  {err}
                </p>
              </div>
            )}

            {/* Sign Up Button */}
            <button 
              type="submit"
              className='w-full h-12 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8 animate-in slide-in-from-bottom-4 duration-500 delay-1000 focus:ring-2 focus:ring-indigo-300'
              disabled={loading}
            >
              {loading ? (
                <div className='flex items-center justify-center'>
                  <svg className='animate-spin -ml-1 mr-3 h-5 w-5 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                  </svg>
                  Creating Account...
                </div>
              ) : (
                'Create Account'
              )}
            </button>

            {/* Login Link */}
            <div className='text-center pt-6 border-t border-gray-100 animate-in fade-in-0 duration-500 delay-1100'>
              <p className='text-gray-600'>
                Already have an account?{' '}
                <button
                  type="button"
                  className='text-indigo-500 hover:text-indigo-600 font-semibold hover:underline transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 rounded px-1 transform hover:scale-105'
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUp
