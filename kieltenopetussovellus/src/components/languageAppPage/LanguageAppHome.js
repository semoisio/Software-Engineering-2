import React, { useState } from 'react'
import {
    LanguageContainer,
    ElementsContainer
} from './LanguageAppHomeElements';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import LanguageNavbar from './languageNavbar/LanguageNavbar';
import LanguageSideBar from './languageNavbar/LanguageSideBar';
import Search from './searchElement/Search';
import NewRecording from './newRecording/NewRecording';
import Profile from './profile/Profile';
import SignOut from './signout/SignOut';
import Errorpage from '../errorPage/Errorpage';
import MyAudio from './myAudio/MyAudio';

/**Landing page after signing in */
const LanguageAppHome = () => {
    // This state keeps track is sidebaropen or not
    const [isOpen, setIsOpen] = useState(false);

    /**
     * Toggle function for showing and hiding sidebar
     */
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    const [mainActive, setMainactive] = useState(true);

    return (
        <LanguageContainer data-testid="languageContainer">
            <Router>
                <LanguageNavbar toggle={toggle} mainActive={mainActive} setMainactive={setMainactive} />
                <LanguageSideBar isOpen={isOpen} toggle={toggle} mainActive={mainActive} setMainactive={setMainactive}/>
                <ElementsContainer>
                    <Switch>
                        <Route exact path="/" component={Search} />
                        <Route path="/newrecording" component={NewRecording} />
                        <Route path="/myaudio" component={MyAudio} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/signout" component={SignOut} />

                        /**Tämä aina viimeiseksi. Ohjaa virhe sivulle */
                        <Route path="/" component={Errorpage} />
                    </Switch>
                </ElementsContainer>
            </Router>
        </LanguageContainer>
    )
}

export default LanguageAppHome
