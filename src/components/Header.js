import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGE } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user)
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)
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

  const handleGptSearchClick = () => {
    // Toggle my GPT search
    dispatch(toggleGptSearchView());
  }
  
  const handleLanguageChange = (e) => {
      dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className='absolute z-10 w-[100%] bg-gradient-to-b from-black px-8 flex justify-between'>
       <img className="w-36 m-2" src={LOGO} alt="logo"></img>
       {user &&  
        <div className='flex justify-between m-2 '>
          {showGptSearch && 
          <select className='max-h-7 px-4 mt-[10px] bg-gray-700 text-white m-2 rounded-md' onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGE.map(lang => (<option key={lang.identifier} value={lang.identifier}>{lang.name}</option>))}
          </select>}
        <button className='max-h-7 px-4 mt-[10px] bg-purple-600 rounded-md text-white' onClick={handleGptSearchClick}>
          {showGptSearch ? 'Homepage' : 'GPT Search'} </button>
        <img className="w-8 h-8 m-2 rounded-md" src={user.photoURL} alt="usericon"></img>
        <button className='font-bold text-white'  onClick={handleSignOut}>Sign Out</button>
        </div>
       }
       
    </div>
  )
}

export default Header