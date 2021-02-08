import './App.css';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import HomePage from './components/homePage/HomePage'
import React from 'react';
import SignUp from './components/signUp/SignUp';
import Errorpage from './components/errorPage/Errorpage';

function App() {
  return (
    <div className="App" data-testid="app">
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/signup" component={SignUp} />

                /**Tämä aina viimeiseksi. Ohjaa virhe sivulle */
                <Route path="/" component={Errorpage} /> 
            </Switch>
        </Router>
    </div>
  );
}

export default App;
