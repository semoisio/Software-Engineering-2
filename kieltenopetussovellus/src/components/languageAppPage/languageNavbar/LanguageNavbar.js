import React from 'react'
import { FaBars } from 'react-icons/fa';
import {
    LanguageNav,
    Logo,
    NavBtn,
    NavBtnWrapper,
    MobileIcon
} from './LanguageNavbarElements';

const LanguageNavbar = ({toggle }) => {
    return (
        <LanguageNav>
            <Logo>GroupO</Logo>
            <NavBtnWrapper>
                <NavBtn to="/" data-testid="navBtnSearch">Search and Listen</NavBtn>
                <NavBtn to="/newreocording" data-testid="navBtnRecording">New recording</NavBtn>
                <NavBtn to="/profile" data-testid="navBtnProfile">Profile</NavBtn>
                <NavBtn to="/signout" data-testid="navBtnSignout">Sign out</NavBtn>
            </NavBtnWrapper>
            <MobileIcon onClick={toggle}>
                <FaBars />
            </MobileIcon>
        </LanguageNav>
    );
}

export default LanguageNavbar
