import './App.css';
import React, { useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import HomePage from './components/homePage/HomePage'
import SignUp from './components/signUp/SignUp';
import Errorpage from './components/errorPage/Errorpage';
import SignIn from './components/signIn/SignIn';
import LanguageAppHome from './components/languageAppPage/LanguageAppHome';
import SignUpSuccess from './components/signUp/SignUpSuccess';
import Confirm from './components/signUp/Confirm';


function App() {
  
  const [isLoggedin, setIsloggedin] = useState(false);

  let page = null;
  
    if (isLoggedin) {
      page =  <LanguageAppHome />;  
    }
    else {
      page = <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signup" component={SignUp} />
          <Route path="/signupsuccess" component={SignUpSuccess} />
          <Route path="/confirm/:id" component={Confirm} />
          <Route path="/signin"><SignIn setIsloggedin={setIsloggedin}/></Route>
          /**Tämä aina viimeiseksi. Ohjaa virhe sivulle */
          <Route path="/" component={Errorpage} />
        </Switch>
      </Router>
    }
  
  
  return (

    <div className="App" data-testid="app">
      {page}
    </div>
  );
}

export default App;
