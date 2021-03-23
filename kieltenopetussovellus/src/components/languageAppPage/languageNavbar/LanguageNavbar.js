import React from 'react'
import { FaBars } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import {
    LanguageNav,
    Logo,
    NavBtn,
    NavBtnWrapper,
    MobileIcon
} from './LanguageNavbarElements';

const LanguageNavbar = ({toggle }) => {
    const history = useHistory();
    
    const handleLogout = () => {
        const r = window.confirm('Are you sure you wish to sign out?')
        if(r){
            history.push("/"); 
            localStorage.clear();    
            window.location.reload();
        }
        
        //<NavBtn to="/signout" data-testid="navBtnSignout">Sign out</NavBtn>
      };
    return (
        <LanguageNav>
            <Logo>GroupO</Logo>
            <NavBtnWrapper>
                <NavBtn to="/" data-testid="navBtnSearch">Search and Listen</NavBtn>
                <NavBtn to="/newrecording" data-testid="navBtnRecording">New recording</NavBtn>
                <NavBtn to="/profile" data-testid="navBtnProfile">Profile</NavBtn>
                
                <button onClick={handleLogout}>Sign out</button>
            </NavBtnWrapper>
            <MobileIcon onClick={toggle}>
                <FaBars />
            </MobileIcon>
        </LanguageNav>
    );
}

export default LanguageNavbar
