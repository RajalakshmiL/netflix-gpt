import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile  } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR, BACKGROUND_PHOTO } from '../utils/constants';

const Login = () => {
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
                    photoURL: USER_AVATAR
                }).then(() => {
                    const {uid, email, displayName, photoURL} = auth.currentUser;
                    dispatch(addUser({uid :uid, email: email,displayName:displayName, photoURL:photoURL }));
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
                <img src={BACKGROUND_PHOTO} alt="logo"></img>
            </div>
            <Header />
            <form onSubmit={(e) => e.preventDefault()} className='w-3/12 mx-[550px] my-40 absolute bg-black px-12 py-10 rounded text-white bg-opacity-80' >
                <h1 className='font-bold text-3xl mb-5'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
                {!isSignInForm && <input ref={name} type='text' placeholder='Full Name' className='w-full m-2 p-2 rounded-sm bg-gray-700 bg-opacity-70 border-solid border-[1px] border-gray-500'></input>}
                <input ref={email} type='text' placeholder='Email Address' className='w-full m-2 p-2 rounded-sm bg-gray-700 bg-opacity-70 border-solid border-[1px] border-gray-500'></input>
                <input ref={password} type='password' placeholder='Password' className='w-full m-2 p-2 rounded-sm bg-gray-700 bg-opacity-70 border-solid border-[1px] border-gray-500 '></input>
                <p className='text-red-400  m-2'>{validationMessage}</p>
                <button className='w-full p-2 m-2 rounded-sm bg-red-700' onClick={handleButtonClick}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
                <p className='m-2 p-2'>{isSignInForm ? 'New to Netflix?' : 'Already Registered? '} <span onClick={toggleSignInForm} className='font-bold cursor-pointer'>{isSignInForm ? 'Sign Up now' : 'Sign In now'}</span>.</p>
            </form>
        </div>
    )
}

export default Login