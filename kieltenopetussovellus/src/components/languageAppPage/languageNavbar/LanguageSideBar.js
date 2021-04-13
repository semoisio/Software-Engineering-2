import React from 'react'
import { useHistory } from 'react-router-dom';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import {
    LanguageSidebarContainer,
    Icon,
    CloseIcon,
    SideBtnWrap,
    SideNavBtn
} from './LanguageSideBarElements';
//<SideNavBtn to="/signout" onClick={toggle}>Sign out</SideNavBtn>



const LanguageSideBar = ({ isOpen, toggle }) => {
    const history = useHistory();

    const handleLogout = () => {
        let dialogprops = {
            title: "Sign out",
            message: "Are you sure you wish to sign out?",
            clickOk: async () => {
                history.push("/");
                localStorage.clear();
                window.location.reload();
            }
        }
        ConfirmDialog(dialogprops);
    };

    return (
        <LanguageSidebarContainer isOpen={isOpen}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SideBtnWrap>
                <SideNavBtn to="/" onClick={toggle}>Search and Listen</SideNavBtn>
                <SideNavBtn to="/newrecording" onClick={toggle}>New recording</SideNavBtn>
                <SideNavBtn to="/profile" onClick={toggle}>Profile</SideNavBtn>
                <SideNavBtn to="/myaudio" onClick={toggle}>My audios</SideNavBtn>
                <button onClick={handleLogout}>Sign out</button>
            </SideBtnWrap>

        </LanguageSidebarContainer>
    )

}

export default LanguageSideBar
