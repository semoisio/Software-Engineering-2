import './App.css';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import HomePage from './components/homePage/HomePage'
import React from 'react';
import SignUp from './components/signUp/SignUp';

function App() {
  return (
    <div className="App" data-testid="app">
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/signup" component={SignUp} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
