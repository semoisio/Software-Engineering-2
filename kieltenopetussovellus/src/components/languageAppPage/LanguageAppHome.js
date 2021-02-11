import React, { useState } from 'react'
import {
    LanguageContainer,
    ElementsContainer
} from './LanguageAppHomeElements';
import LanguageNavbar from './languageNavbar/LanguageNavbar';
import LanguageSideBar from './languageNavbar/LanguageSideBar';
import Search from './searchElement/Search';
import NewRecording from './newRocording/NewRecording';
import Profile from './profile/Profile';
import SignOut from './signout/SignOut';
import { pages } from './PageHandler'

/**Landing page after signing in */
const LanguageAppHome = () => {
    // This state keeps track is sidebaropen or not
    const [isOpen, setIsOpen] = useState(false);

    //This state keeps track what component is rendered
    const [page, setPage] = useState(Search);

    /**
     * Toggle function for showing and hiding sidebar
     */
    const toggle = () => {
        setIsOpen(!isOpen);
    };

    /**
     * This function combine toggle and swict funcs
     */
    const toggleAndSwitch = (page) => {
        setIsOpen(!isOpen);
        switchPage(page);
    };


    /**
     * Funnktion sets useState varable to that page what u want to render.
     * 
     * @param {Pages what u wanna show} param 
     */
    const switchPage = (param) => {
        switch (param) {
            case pages.searchAndListen:
                setPage(Search);
                break;
            case pages.newRecording:
                setPage(NewRecording);
                break;
            case pages.profile:
                setPage(Profile);
                break;
            case pages.signOut:
                setPage(SignOut);
            default:
                break;
        }
    };

    return (
        <LanguageContainer data-testid="languageContainer">
            <LanguageNavbar toggle={toggle} switchPage={switchPage} />
            <LanguageSideBar isOpen={isOpen} toggle={toggle} switchPage={toggleAndSwitch}/>
            <ElementsContainer>
                {page}
            </ElementsContainer>
        </LanguageContainer>
    )
}

export default LanguageAppHome
