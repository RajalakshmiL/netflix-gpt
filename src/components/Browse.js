import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';

const Browse = () => {
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  
  return (
    <div>
      <Header/>
      <MainContainer />
      <SecondaryContainer />

      {/*
        Main Container
          -  VideoBackground
          -  Video Title

        Secondanry Container
          - Movie list * n 
              - cards * n

      */}
    </div>
  )
}

export default Browse