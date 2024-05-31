import React from 'react'
import { auth } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '../utils/userSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
  const handleSignOut = () => {
    signOut(auth).then(() => {
      dispatch(removeUser());
      navigate('/');
    }).catch((error) => {
      navigate('/error');
    });
  }
  return (
    <div className='relative w-[100%] bg-gradient-to-b from-black px-8 py-4 flex justify-between'>
       <img className="w-44 m-2" src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png" alt="logo"></img>
       {user &&  
        <div className='flex justify-between p-2 '>
        <img className="w-8 h-8 m-2" src={user.photoURL} alt="usericon"></img>
        <button className='font-bold text-white'  onClick={handleSignOut}>Sign Out</button>
        </div>
       }
       
    </div>
  )
}

export default Header