import Axios from "axios";
import { Image , Button} from "react-bootstrap";
import notFound from "./notFound.jpg"

const MovieCard = (data) => {

    console.error(data);
    
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

    let movieImage = data.movie.show.image;
    if(movieImage == undefined)
        movieImage = {
            medium: notFound
        };

    return (
        <div>
        
        <h1> {data.movie.show.name}</h1>
        
        <Image src={movieImage.medium} rounded />
        <p>{ data.movie.show.name }</p>
        <Button onClick={(e) => AddToFavorite(data.movie.show.id)}>Add to favorite</Button>
        
        </div>
    );
}

export default MovieCard;