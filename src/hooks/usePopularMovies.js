import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/movieSlice";
import { API_OPTIONS } from "../utils/constants";
import { useEffect } from "react";

const  usePopularMovies = () => {
    // Fteching Data from TMDB API and update Store
    const dispatch = useDispatch();
    const getPopularMovies = async () => {
      const data = await fetch('https://api.themoviedb.org/3/movie/upcoming?page=1', API_OPTIONS);
      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    }
  
    useEffect(()=>{
      getPopularMovies();
    },[]);
}


export default usePopularMovies;