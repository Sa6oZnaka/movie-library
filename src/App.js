import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import AppNavbar from './Navbar';
import Movies from './Movies';
import Search from './Search';
import Register from './Register';

function App() {

    return (

        <div className="App">
            
            <Router>
                <AppNavbar/>
                
                <Switch>

                    <Route exact path="/">
                        <Home />
                    </Route>

                    <Route exact path="/search">
                        <Search />
                    </Route>

                    <Route exact path="/register">
                        <Register />
                    </Route>

                    <Route path="/movies/:title">
                        <Movies />
                    </Route>

                </Switch>
        </Router>
        </div>
  );
}

export default App;
