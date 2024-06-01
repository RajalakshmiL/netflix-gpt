import React from 'react'
import MovieCards from './MovieCards'

const MovieList = ({title, movies}) => {
 
  return (
    <div className='p-4 bg-black'>
        <h1 className='text-xl  font-bold text-white'>{title}</h1>
        <div className='flex overflow-x-scroll '>
            {movies && <div className='flex'>
                {movies.map((movie) => 
                <MovieCards key={movie.id} poster_path={movie.poster_path} />
                )}
            </div>
            }
        </div>
    </div>
  )
}

export default MovieList