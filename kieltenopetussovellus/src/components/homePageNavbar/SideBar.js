import React from 'react'
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SideBtnWrap,
    SidebarRoute
} from './SideBarElements';

const SideBar = ({ isOpen, toggle }) => {
    return (
        <SidebarContainer isOpen={isOpen} data-testid="sidebarcontainer" >
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SideBtnWrap>
                    <SidebarRoute to="/signin" onClick={toggle}>Sign in</SidebarRoute>
                    <SidebarRoute to="/signup" onClick={toggle}>Join now</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default SideBar
