import React from 'react'
import { FaBars } from 'react-icons/fa';
import {
    LanguageNav,
    Logo,
    NavBtn,
    NavBtnWrapper,
    MobileIcon
} from './LanguageNavbarElements';
import {pages} from '../PageHandler';

const LanguageNavbar = ({toggle,switchPage }) => {
    return (
        <LanguageNav>
            <Logo>GroupO</Logo>
            <NavBtnWrapper>
                <NavBtn onClick={() =>{switchPage(pages.searchAndListen)}} data-testid="navBtnSearch">Search and Listen</NavBtn>
                <NavBtn onClick={() =>{switchPage(pages.newRecording)}} data-testid="navBtnRecording">New recording</NavBtn>
                <NavBtn onClick={() =>{switchPage(pages.profile)}} data-testid="navBtnProfile">Profile</NavBtn>
                <NavBtn onClick={() =>{switchPage(pages.signOut)}} data-testid="navBtnSignout">Sign out</NavBtn>
            </NavBtnWrapper>
            <MobileIcon onClick={toggle}>
                <FaBars />
            </MobileIcon>
        </LanguageNav>
    );
}

export default LanguageNavbar
