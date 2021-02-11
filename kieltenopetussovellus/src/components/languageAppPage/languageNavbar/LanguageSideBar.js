import React from 'react'

import {
    LanguageSidebarContainer,
    Icon,
    CloseIcon,
    SideBtnWrap,
    SideNavBtn
} from './LanguageSideBarElements';
import {pages} from '../PageHandler';

const LanguageSideBar = ({ isOpen, toggle, switchPage }) => {
    return (
        <LanguageSidebarContainer isOpen={isOpen}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SideBtnWrap>
                <SideNavBtn onClick={() =>{switchPage(pages.searchAndListen)}}>Search and Listen</SideNavBtn>
                <SideNavBtn onClick={() =>{switchPage(pages.newRecording)}}>New recording</SideNavBtn>
                <SideNavBtn onClick={() =>{switchPage(pages.profile)}}>Profile</SideNavBtn>
                <SideNavBtn onClick={() =>{switchPage(pages.signOut)}}>Sign out</SideNavBtn>
            </SideBtnWrap>

        </LanguageSidebarContainer>
    )
}

export default LanguageSideBar
