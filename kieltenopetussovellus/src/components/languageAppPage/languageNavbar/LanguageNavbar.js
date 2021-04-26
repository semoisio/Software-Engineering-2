import React, {useState} from 'react'
import { FaBars } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import {
    LanguageNav,
    Logo,
    NavBtn,
    NavBtnWrapper,
    MobileIcon,
    SINavBtn
} from './LanguageNavbarElements';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';

const LanguageNavbar = ({toggle, mainActive, setMainactive,setUser }) => {
    const history = useHistory();

    
    
    const handleLogout = () => {
        let dialogprops = {
            title: "Sign out",
            message: "Are you sure you wish to sign out?",
            clickOk: () => {
                history.push("/"); 
                localStorage.clear(); 
                setUser("");   
                //window.location.reload();
            }
        }
        ConfirmDialog(dialogprops);
    };
    return (
        <LanguageNav>
            <Logo>LingoRec</Logo>
            <NavBtnWrapper>
                <NavBtn activeClassName={mainActive ? "active" : null} onClick={() => setMainactive(true)} to="/" data-testid="navBtnSearch" >Search and Listen</NavBtn>
                <NavBtn activeClassName="active"  to="/newrecording" data-testid="navBtnRecording" onClick={() => setMainactive(false)}>New recording</NavBtn>
                <NavBtn activeClassName="active" to="/myaudio" data-testid="navBtnProfile" onClick={() => setMainactive(false)}>My audios</NavBtn>
                <NavBtn activeClassName="active" to="/profile" data-testid="navBtnProfile" onClick={() => setMainactive(false)}>Profile</NavBtn>
                <SINavBtn className="button1" onClick={handleLogout}>Sign out</SINavBtn>
            </NavBtnWrapper>
            <MobileIcon onClick={toggle}>
                <FaBars />
            </MobileIcon>
        </LanguageNav>
    );
}

export default LanguageNavbar
