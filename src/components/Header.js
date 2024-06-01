import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
  const handleSignOut = () => {
    signOut(auth).then(() => {}).catch((error) => {
      navigate('/error');
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const {uid, email, displayName, photoURL} = user;
        dispatch(addUser({uid :uid, email: email,displayName:displayName,photoURL:photoURL }));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    // Unsubscribe when Component unmounts
    return () => unsubscribe();
  },[]);

  return (
    <div className='absolute z-10 w-[100%] bg-gradient-to-b from-black px-8 flex justify-between'>
       <img className="w-36 m-2" src={LOGO} alt="logo"></img>
       {user &&  
        <div className='flex justify-between p-2 '>
        <img className="w-8 h-8 m-2 rounded-md" src={user.photoURL} alt="usericon"></img>
        <button className='font-bold text-white'  onClick={handleSignOut}>Sign Out</button>
        </div>
       }
       
    </div>
  )
}

export default Header