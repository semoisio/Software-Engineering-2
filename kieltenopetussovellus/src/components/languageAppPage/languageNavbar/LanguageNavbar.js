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

const LanguageNavbar = ({toggle }) => {
    const history = useHistory();

    const [mainActive, setMainactive] = useState(true);
    
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
                <NavBtn activeClassName={mainActive ? "active" : null} onClick={() => setMainactive(true)} to="/" data-testid="navBtnSearch" >Search and Listen</NavBtn>
                <NavBtn activeClassName="active"  to="/newrecording" data-testid="navBtnRecording" onClick={() => setMainactive(false)}>New recording</NavBtn>
                <NavBtn activeClassName="active" to="/profile" data-testid="navBtnProfile" onClick={() => setMainactive(false)}>Profile</NavBtn>
                <NavBtn activeClassName="active" to="/myaudio" data-testid="navBtnProfile" onClick={() => setMainactive(false)}>My audios</NavBtn>
                <SINavBtn className="button1" onClick={handleLogout}>Sign out</SINavBtn>
            </NavBtnWrapper>
            <MobileIcon onClick={toggle}>
                <FaBars />
            </MobileIcon>
        </LanguageNav>
    );
}

export default LanguageNavbar
