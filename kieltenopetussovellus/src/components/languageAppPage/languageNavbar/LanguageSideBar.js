import React from 'react'
import { useHistory } from 'react-router-dom';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import {
    LanguageSidebarContainer,
    Icon,
    CloseIcon,
    SideBtnWrap,
    SideNavBtn,
    SideNavBtnLogOut

} from './LanguageSideBarElements';
//<SideNavBtn to="/signout" onClick={toggle}>Sign out</SideNavBtn>



const LanguageSideBar = ({ isOpen, toggle, mainActive, setMainactive  }) => {
    const history = useHistory();

    const handleLogout = () => {
        let dialogprops = {
            title: "Sign out",
            message: "Are you sure you wish to sign out?",
            clickOk: async () => {
                //history.push("/");
                localStorage.clear();
                window.location.reload();
            }
        }
        //history.push("/");
        localStorage.clear();
        window.location.reload();
        //ConfirmDialog(dialogprops);
    };

    const btnClicked = (value) => {
        toggle();
        setMainactive(value);
    }

    return (
        <LanguageSidebarContainer isOpen={isOpen}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SideBtnWrap>
                <SideNavBtn to="/"  onClick={() => btnClicked(true)}>Search and Listen</SideNavBtn>
                <SideNavBtn to="/newrecording" onClick={() => btnClicked(false)}>New recording</SideNavBtn>
                <SideNavBtn to="/profile" onClick={() => btnClicked(false)}>Profile</SideNavBtn>
                <SideNavBtn to="/myaudio" onClick={() => btnClicked(false)}>My audios</SideNavBtn>
                <SideNavBtnLogOut  to="/" onClick={handleLogout}>Sign out</SideNavBtnLogOut>
            </SideBtnWrap>

        </LanguageSidebarContainer>
    )

}

export default LanguageSideBar
