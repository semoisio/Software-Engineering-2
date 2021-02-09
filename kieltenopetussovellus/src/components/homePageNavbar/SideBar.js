import React from 'react'
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
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
                <SidebarMenu>
                    <SidebarLink to="/" onClick={toggle}>Home</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to="/signin" onClick={toggle}>Sign In</SidebarRoute>
                    <SidebarRoute to="/signup" onClick={toggle}>Sign Up</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default SideBar
