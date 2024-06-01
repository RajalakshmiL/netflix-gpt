import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  return (
    <div className='bg-black'>
      <div className='-mt-64 relative z-20 pl-12'>
          <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies}/>
          <MovieList title={"Trending"} movies={movies?.trendingMovies}/>
          <MovieList title={"Popoular Movies"} movies={movies?.popularMovies}/>
          <MovieList title={"Horror Movies"} movies={movies?.popularMovies}/>
      </div>
      
      
    {/*
        MovieList - Popular
            MovieCards * n
        MovieList - NowPlaying
        MovieList - Trending    
    */}

    </div>

  )
}

export default SecondaryContainer