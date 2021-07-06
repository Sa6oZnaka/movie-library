import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import AppNavbar from './Navbar';
import Movies from './Movies';

function App() {
  return (

    <div className="App">
        <AppNavbar/>
        <Router>
            <header className="App-header">
                
                <p>
                Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                className="App-link"
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
                >
                Learn React
                </a>

                
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>

                        <Route path="/movies/:title">
                            <Movies />
                        </Route>


                    </Switch>
                </div>

                
            </header>
      </Router>
    </div>
  );
}

export default App;
