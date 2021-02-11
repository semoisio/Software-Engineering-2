import React, { useState } from 'react'
import {
    LanguageContainer,
    ElementsContainer
} from './LanguageAppHomeElements';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import LanguageNavbar from './languageNavbar/LanguageNavbar';
import LanguageSideBar from './languageNavbar/LanguageSideBar';
import Search from './searchElement/Search';
import NewRecording from './newRocording/NewRecording';
import Profile from './profile/Profile';
import SignOut from './signout/SignOut';

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


    return (
        <LanguageContainer data-testid="languageContainer">
            <Router>
                <LanguageNavbar toggle={toggle} />
                <LanguageSideBar isOpen={isOpen} toggle={toggle} />
                <ElementsContainer>
                    <Switch>
                        <Route exact path="/" component={Search} />
                        <Route path="/newreocording" component={NewRecording} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/signout" component={SignOut} />
                    </Switch>
                </ElementsContainer>
            </Router>
        </LanguageContainer>
    )
}

export default LanguageAppHome
