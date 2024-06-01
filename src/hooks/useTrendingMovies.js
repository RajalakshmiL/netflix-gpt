import { useDispatch } from "react-redux";
import { addTrendingMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const  useTrendingMovies = () => {
    // Fteching Data from TMDB API and update Store
    const dispatch = useDispatch();
    const getTrendingMovies = async () => {
      const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS);
      const json = await data.json();
      dispatch(addTrendingMovies(json.results));
    }
  
    useEffect(()=>{
      getTrendingMovies();
    },[]);
}


export default useTrendingMovies;