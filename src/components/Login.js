import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile  } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [validationMessage, setValidationMessage] = useState(null);
    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm); 
    }
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const handleButtonClick = () => {
        const validate = checkValidData(name?.current?.value, email.current.value, password.current.value);
        setValidationMessage(validate);
        if(validate) return;
        if(!isSignInForm){
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                const user = userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value,
                    photoURL: 'https://images.unsplash.com/photo-1604085572504-a392ddf0d86a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                }).then(() => {
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(addUser({uid :uid, email: email,displayName:displayName, photoURL:photoURL }));
                    navigate('/browse');
                }).catch((error) => {
                    setValidationMessage(error.message);
                });
               
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setValidationMessage(errorMessage);
            });
        }else{
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                navigate('/browse');
                console.log(user);
            })
              .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setValidationMessage(errorMessage);
            });
        }
    } 
     return (
        <div>
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/a99688ca-33c3-4099-9baa-07a2e2acb398/ca15fd28-b624-4852-8bfe-9cdd5c88475d/IN-en-20240520-popsignuptwoweeks-perspective_alpha_website_small.jpg' alt="logo"></img>
            </div>
            <Header />
            <form onSubmit={(e) => e.preventDefault()} className='w-3/12 m-auto relative bg-black px-12 py-10 rounded text-white bg-opacity-80'>
                <h1 className='font-bold text-3xl mb-5'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                {!isSignInForm && <input ref={name} type='text' placeholder='Full Name' className='w-full m-2 p-2 rounded-sm bg-gray-700 bg-opacity-70 border-solid border-[1px] border-gray-500'></input>}
                <input ref={email} type='text' placeholder='Email Address' className='w-full m-2 p-2 rounded-sm bg-gray-700 bg-opacity-70 border-solid border-[1px] border-gray-500'></input>
                <input ref={password} type='text' placeholder='Password' className='w-full m-2 p-2 rounded-sm bg-gray-700 bg-opacity-70 border-solid border-[1px] border-gray-500 '></input>
                <p className='text-red-400  m-2'>{validationMessage}</p>
                <button className='w-full p-2 m-2 rounded-sm bg-red-700' onClick={handleButtonClick}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
                <p className='m-2 p-2'>{isSignInForm ? 'New to Netflix?' : 'Already Registered? '} <span onClick={toggleSignInForm} className='font-bold cursor-pointer'>{isSignInForm ? 'Sign Up now' : 'Sign In now'}</span>.</p>
            </form>
        </div>
    )
}

export default Login