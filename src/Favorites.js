import { useEffect, useState } from "react";
import { Row, Container, Col, Image } from "react-bootstrap";
import Axios from "axios";
import { Grid, Paper} from "@material-ui/core";

const Favorites = () => {

    const ApiUrl = "http://api.tvmaze.com/shows/";
    const [userData, setUserData] = useState({});

    useEffect(() => {
        getUserFavorites();
    }, []);
    
    
    const getUserFavorites = () => {
        Axios.get("http://localhost:3001/favorites", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            const movies = response.data;
            console.log(movies);
            
            let moviesData = [];
            if(movies.length > 0){

                for(let i = 0; i < movies.length; i ++){
                    Axios.get(ApiUrl + movies[i].movieId).then((response) => {
                        moviesData.push(response);
                        if(moviesData.length === movies.length){
                            setUserData(moviesData);
                        }
                    })
                }
            }
        })
    }
    
    return (
    
        <div className="Favorite">
          <header className="App-header">
    
            <h2>Favorite</h2>
    
          </header>


          <Grid container spacing={3}>
          
              
                { (userData.length > 0) ? userData.map( (droplet, index) => {
                return (
                    
                    <Grid item xs={2}>
                        <Paper>
                        <Image src={droplet.data.image.medium} rounded />
                        <p>{ droplet.data.name }</p>
                        </Paper>
                    </Grid>
                    
                )
                }) : <tr><td colSpan="5">Your favorite list is empty</td></tr> }
            
          
            </Grid>

        </div>
      );
}

export default Favorites;