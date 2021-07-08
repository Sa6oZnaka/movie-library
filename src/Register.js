import { useState } from "react";
import Axios from "axios";

const Register = () => {

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState(false);

    Axios.defaults.withCredentials = true;
    const register = () => {
        Axios.post("http://localhost:3001/register", {
            username: usernameReg,
            password: passwordReg
        }).then((response) => {
            console.log(response);
        })
    };

    const login = () => {
        console.log("POSTED TO BACKEDN!");
        Axios.post("http://localhost:3001/login", {
            username: username,
            password: password
        }).then((response) => {
            if(! response.data.auth){
                setLoginStatus(false);
            } else {
                console.log(true);
                localStorage.setItem("token", response.data.token);
                setLoginStatus(true);
            }
        });
    };

    const userAuthencticated = () => {
        Axios.get("http://localhost:3001/isUserAuth", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response);
        })
    }

    const getUserFavorites = () => {
        Axios.get("http://localhost:3001/favorites", {
            headers: {
                "x-access-token": localStorage.getItem("token")
            }
        }).then((response) => {
            console.log(response);
        })
    }

    const getRatings = () => {
        Axios.get("http://localhost:3001/ratings", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                movieId: 6,
            }
        }).then((response) => {
            console.log(response);
        })
    }

    const getNotes = () => {
        Axios.get("http://localhost:3001/notes", {
            headers: {
                "x-access-token": localStorage.getItem("token"),
                movieId: 6,
            }
        }).then((response) => {
            console.log(response);
        })
    }

    return (
        <div className="Movies">
            <div className="registration">
                <h2> Register </h2>
                <label>Username</label>
                <input type="text" onChange = {(e) => {
                    setUsernameReg(e.target.value);
                }}/>
                <label>Password</label>
                <input type="text" onChange = {(e) => {
                    setPasswordReg(e.target.value);
                }}/>
                <button onClick={register}>Register</button>
            </div>

            <div className="login">
                <h2> Login </h2>
                <label>Username</label>
                <input type="text" onChange = {(e) => {
                    setUsername(e.target.value);
                }}/>
                <label>Password</label>
                <input type="text" onChange = {(e) => {
                    setPassword(e.target.value);
                }}/>
                <button onClick={login}>Login</button>
            </div>

            <h1>{loginStatus}</h1>

            {loginStatus && (
                <div>
                    <h1>You are now logged in!</h1>
                </div>
            )}


        </div>
    )


}

export default Register;