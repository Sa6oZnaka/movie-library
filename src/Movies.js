import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Axios from "axios";
import { Grid, Paper} from "@material-ui/core";
import MovieCard from "./MovieCard";
// API
// http://api.tvmaze.com/search/shows?q=tets

const Movies = () => {

    const ApiUrl = "http://api.tvmaze.com/search/shows?q=";
    const [movies, setMoviesData] = useState({});
    let { title } = useParams();

    useEffect(() => {
        getSearchResults();
    }, []);

    const getSearchResults = () => {
        Axios.get(ApiUrl + title).then((response) => {
            const movies = response.data;
            setMoviesData(movies);
        })
    }

    return (
        <div className="Movies">

        <div>Results for:{title}</div>

        <Grid container spacing={3}>
                 
            { (movies.length > 0) ? movies.map( (movie) => {
            
            return (
                <Grid item xs={12}>
                    <Paper>
                        <MovieCard movie = {movie}/>
                    </Paper>
                </Grid>
                )
                }) : <p>Nothing found!</p> }
        
        </Grid>

        </div>

    )
}

export default Movies;