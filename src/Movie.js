import { useEffect, useState } from "react";
import {useParams} from 'react-router-dom';
import Axios from "axios";
import MovieCard from './MovieCard';
import StarRatings from 'react-star-ratings';
import { Button} from "react-bootstrap";
import { Grid, Paper} from "@material-ui/core";

const Movie = () => {

    let { title } = useParams();
    const [movie, setMovieData] = useState({});
    const [notes, setNotes] = useState({});
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const apiURL = "http://api.tvmaze.com/shows/";

    useEffect(() => {
        getMovieData();
        getMovieRating();
        getMovieNotes();
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

    const getMovieNotes = () => {
        Axios.get("http://localhost:3001/notes", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                movieId: title
            }
        }).then((response) => {
            const comments = response.data;
            console.log(response);
            setNotes(comments);
            console.log(notes);
        })
    }


    const changeRating = (rating) => {
        //console.log(rating);
        Axios.get("http://localhost:3001/addRating", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                movieId: title,
                rating: rating
            }
        }).then((response) => {
            console.log(response);
        })
    }

    const addComment = (id) => {
        console.log(id);
        console.log(comment);
        Axios.get("http://localhost:3001/addComment", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                movieId: id,
                comment: comment,
                rating: rating
            }
        }).then((response) => {
            console.log(response);
        })
    }

    function setCommentText(val){
        setComment(val.target.value)
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
            <div className="form-movie">
                <Grid container spacing={3}>
                    
                    { (notes.length > 0) ? notes.map( (note) => {
                    return (
                        <Grid item xs={12}>
                            <Paper>
                                <h2> {note.note}</h2>
                            </Paper>
                        </Grid>
                        )
                        }) : <p>Nothing found!</p> }
                
                </Grid>

                <textarea type="text" onChange={setCommentText} className="form-control" id="movietextarea" rows="4"></textarea>
                <Button onClick={(e) => addComment(movie.id) }>Add Comment</Button>
            
            </div>
        </div>
    )

}

export default Movie;