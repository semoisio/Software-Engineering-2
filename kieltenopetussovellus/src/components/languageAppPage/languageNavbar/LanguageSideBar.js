import React from 'react'

import {
    LanguageSidebarContainer,
    Icon,
    CloseIcon,
    SideBtnWrap,
    SideNavBtn
} from './LanguageSideBarElements';

const LanguageSideBar = ({ isOpen, toggle }) => {
    return (
        <LanguageSidebarContainer isOpen={isOpen}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SideBtnWrap>
                <SideNavBtn to="/"  onClick={toggle}>Search and Listen</SideNavBtn>
                <SideNavBtn to="/newreocording" onClick={toggle}>New recording</SideNavBtn>
                <SideNavBtn to="/profile" onClick={toggle}>Profile</SideNavBtn>
                <SideNavBtn to="/signout" onClick={toggle}>Sign out</SideNavBtn>
            </SideBtnWrap>

        </LanguageSidebarContainer>
    )
}

export default LanguageSideBar
