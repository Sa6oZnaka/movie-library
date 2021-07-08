import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Axios from "axios";
import MovieCard from './MovieCard';

const Movie = () => {

    let { title } = useParams();
    console.log(title);
    const [movie, setMovieData] = useState({});
    const apiURL = "http://api.tvmaze.com/shows/";

    useEffect(() => {
        getMovieData();
    }, []);

    const getMovieData = () => {
        Axios.get(apiURL + title).then((response) => {
            const movie = response.data;
            setMovieData(movie);
        })
    }
    
    return (
        <MovieCard movie = {movie}/>
    )

}

export default Movie;