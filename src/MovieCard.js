import Axios from "axios";
import { Image , Button} from "react-bootstrap";
import notFound from "./notFound.jpg"

const MovieCard = (data) => {

    console.warn(data);

    const addToFavorite = (movieId) => {
        Axios.get("http://localhost:3001/addFavorite", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                movieId
            }
        }).then((response) => {
            console.log(response);
        })
    }

    const removeFavorite = (movieId) => {
        Axios.get("http://localhost:3001/removeFavorite", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                movieId
            }
        }).then((response) => {
            console.log(response);
        })
    }
    
    let movieImage = data.movie.image;
    if(movieImage == undefined)
        movieImage = {
            medium: notFound
        };

    return (
        <div>
        
        <h1> {data.movie.name}</h1>
        
        <Image src={movieImage.medium} rounded />
        <p>{ data.movie.name }</p>
        <Button onClick={(e) => addToFavorite(data.movie.id)}>Add to favorite</Button>
        <Button variant="danger" onClick={(e) => removeFavorite(data.movie.id) }>Remove favorite</Button>
        
        </div>
    );
}

export default MovieCard;