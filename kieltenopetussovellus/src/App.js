import './App.css';
import React, { useEffect, useState } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import HomePage from './components/homePage/HomePage'
import SignUp from './components/signUp/SignUp';
import Errorpage from './components/errorPage/Errorpage';
import SignIn from './components/signIn/SignIn';
import LanguageAppHome from './components/languageAppPage/LanguageAppHome';
import SignUpSuccess from './components/signUp/SignUpSuccess';
import Confirm from './components/signUp/Confirm';
import ProfileDeleted from './components/profileDeleted/ProfileDeleted';
import ForgotPassword from './components/signIn/ForgotPassword';
import ResetPassword from './components/signIn/ResetPassword';


function App() {

  const [user, setUser] = useState();

  return (

    <div className="App" data-testid="app">
      {
        localStorage.getItem("user") ?
          <LanguageAppHome /> :
          <Router>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route path="/signup" component={SignUp} />
              <Route path="/profile" component={ProfileDeleted} />
              <Route path="/signupsuccess" component={SignUpSuccess} />
              <Route path="/confirm/:id" component={Confirm} />
              <Route path="/signin"><SignIn setUser={setUser}/></Route>
              <Route path="/forgotpassword" component={ForgotPassword} />
              <Route path="/resetpassword/:id" component={ResetPassword} />
          /**Tämä aina viimeiseksi. Ohjaa virhe sivulle */
          <Route path="/" component={Errorpage} />
            </Switch>
          </Router>
      }
    </div>
  );
}

export default App;
