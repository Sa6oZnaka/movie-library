import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import AppNavbar from './Navbar';
import Movies from './Movies';
import Register from './Register';
import Movie from './Movie';

function App() {

    return (

        <div className="App">
            
            <Router>
                <AppNavbar/>
                
                <Switch>

                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/register">
                        <Register />
                    </Route>

                    <Route path="/movies/:title">
                        <Movies />
                    </Route>

                    <Route path="/movie/:title">
                        <Movie/>
                    </Route>

                </Switch>
        </Router>
        </div>
  );
}

export default App;
