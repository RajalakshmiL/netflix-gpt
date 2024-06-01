import React from 'react'
import { IMG_CDN_URL } from '../utils/constants'

const MovieCards = ({poster_path}) => {
  return (
    <div className='w-44 pr-2 pt-3'>
        <img className="rounded-sm" alt="Movie card" src={IMG_CDN_URL + poster_path}></img>
    </div>
   
  )
}

export default MovieCards