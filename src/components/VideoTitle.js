import React from 'react'

const VideoTitle = ({title,overview}) => {
  return (
    <div className='p-16 pt-[20%] absolute w-screen aspect-video text-white bg-gradient-to-r from-black '>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className='w-1/4 pt-5'>{overview}</p>
        <div className='pt-8'>
            <button className='text-lg p-2 px-6 bg-white text-black rounded-md font-bold hover:bg-opacity-80'>▶ Play</button>
            <button className='text-lg mx-3 p-2  px-6 bg-gray-500 text-white rounded-md hover:bg-opacity-80 font-bold' >⨀ More Info</button>
        </div>
    </div>
  )
}

export default VideoTitle