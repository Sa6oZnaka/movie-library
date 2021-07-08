import notFound from "./notFound.jpg"
import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Axios from "axios";
import { Grid, Paper} from "@material-ui/core";
import { Image , Button} from "react-bootstrap";
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
            console.log(movies);
            setMoviesData(movies);
        })
    }

    const AddToFavorite = (movieId) => {
        console.log("Open movie page for ID: " + movieId);

        Axios.get("http://localhost:3001/addFavorite", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                movieId
            }
        }).then((response) => {
            console.log(response);
        })
    }

    return (
        <div className="Movies">

        <div>Results for:{title}</div>

        <Grid container spacing={3}>
          
              
            { (movies.length > 0) ? movies.map( (droplet, index) => {
            
            let img = notFound;

            let movieImage = droplet.show.image;
            if(movieImage == undefined)
            movieImage = {
                medium: notFound
            };
            return (
                    
                <Grid item xs={12}>
                    <Paper>
                        <Image src={movieImage.medium} rounded />
                        <p>{ droplet.show.name }</p>
                        <Button onClick={(e) => AddToFavorite(droplet.show.id)}>Add to favorite</Button>
                    </Paper>
                </Grid>
                )
                }) : <tr><td colSpan="5">Your favorite list is empty</td></tr> }
        
        </Grid>

        </div>

    )
}

export default Movies;