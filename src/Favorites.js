import { useEffect, useState } from "react";

import Axios from "axios";

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
                //let done = 0;
                for(let i = 0; i < movies.length; i ++){
                    // if null is stored in db
                    //if(movies[i].movieId != null){
                        Axios.get(ApiUrl + movies[i].movieId).then((response) => {
                            moviesData.push(response);
                            //done ++;
                            if(moviesData.length === movies.length){
                                setUserData(moviesData);
                            }
                        })
                    //}else{
                    //    done++;
                    //}
                }
            }
        })
    }
    
    return (
    
        <div className="Favorite">
          <header className="App-header">
    
            <h2>Favorite</h2>
    
          </header>
    
          <div className="user-container">
            <h5 className="info-item">{userData.name}</h5>
            <h5 className="info-item">{userData.premiered}</h5>
          </div>

          <table>
            <thead>
                <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Movie ID</th>
                </tr>
            </thead>
            <tbody>
                { (userData.length > 0) ? userData.map( (droplet, index) => {
                return (
                    <tr key={ index }>
                    <td>{ index }</td>
                    <td>{ droplet.data.name }</td>
                    <td>{ droplet.data.id }</td>
                    </tr>
                )
                }) : <tr><td colSpan="5">Your favorite list is empty</td></tr> }
            </tbody>
            </table>
        </div>
       
      );
}

export default Favorites;