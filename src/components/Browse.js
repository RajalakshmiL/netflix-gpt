import React from 'react'
import Header from './Header'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import usePopularMovies from '../hooks/usePopularMovies';
import useTrendingMovies from '../hooks/useTrendingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
  const showGptSearch = useSelector((Store) => Store.gpt.showGptSearch);
  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  
  return (
    <div>
      <Header/>
      {showGptSearch ? (<GptSearch />) : (<>
      <MainContainer />
      <SecondaryContainer />
      </>)} 
   
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