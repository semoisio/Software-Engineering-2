import './App.css';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import HomePage from './components/homePage/HomePage'
import React from 'react';

function App() {
  return (
    <div className="App">
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
