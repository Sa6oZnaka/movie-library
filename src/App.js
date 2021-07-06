import './App.css';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';

function App() {
  return (

    <div className="App">
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

                <Navbar/>
                <div className="content">
                    <Switch>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>

                
            </header>
      </Router>
    </div>
  );
}

export default App;
