import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [isSignInForm, setIsSignInForm ] = useState(true);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm); 
    }
    return (
        <div>
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/a99688ca-33c3-4099-9baa-07a2e2acb398/ca15fd28-b624-4852-8bfe-9cdd5c88475d/IN-en-20240520-popsignuptwoweeks-perspective_alpha_website_small.jpg' alt="logo"></img>
            </div>
            <Header />
            <form className='w-3/12 m-auto relative bg-black px-12 py-10 rounded text-white bg-opacity-80'>
                <h1 className='font-bold text-3xl mb-5'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                {!isSignInForm && <input type='text' placeholder='Full Name' className='w-full m-2 p-2 rounded-sm bg-gray-700 bg-opacity-70 border-solid border-[1px] border-gray-500'></input>}
                <input type='text' placeholder='Email Address' className='w-full m-2 p-2 rounded-sm bg-gray-700 bg-opacity-70 border-solid border-[1px] border-gray-500'></input>
                <input type='text' placeholder='Password' className='w-full m-2 p-2 rounded-sm bg-gray-700 bg-opacity-70 border-solid border-[1px] border-gray-500 '></input>
                <button className='w-full p-2 m-2 rounded-sm bg-red-700'>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
                <p className='m-2 p-2'>{isSignInForm ? 'New to Netflix?' : 'Already Registered'} <a href='#' onClick={toggleSignInForm} className='font-bold'>{isSignInForm ? 'Sign Up now' : 'Sign In now'}</a>.</p>
            </form>
        </div>
    )
}

export default Login