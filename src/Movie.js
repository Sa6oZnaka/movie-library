import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Axios from "axios";
import MovieCard from './MovieCard';
import StarRatings from 'react-star-ratings';

const Movie = () => {

    let { title } = useParams();
    const [movie, setMovieData] = useState({});
    const [rating, setRating] = useState(0);
    const apiURL = "http://api.tvmaze.com/shows/";

    useEffect(() => {
        getMovieData();
        getMovieRating();
    }, []);

    const getMovieData = () => {
        Axios.get(apiURL + title).then((response) => {
            const movie = response.data;
            setMovieData(movie);
        })
    }
    
    const getMovieRating = () => {
        Axios.get("http://localhost:3001/ratings", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                movieId: title
            }
        }).then((response) => {
            const stars = response.data.rating;
            if(stars > 0 && stars <= 5)
                setRating(response.data.rating);
        })
    }

    const changeRating = (rating) => {
        console.log(rating);
    }

    return (
        <div>
            <MovieCard movie = {movie}/>
            <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={5}
            name='rating'
            />
        </div>
    )

}

export default Movie;