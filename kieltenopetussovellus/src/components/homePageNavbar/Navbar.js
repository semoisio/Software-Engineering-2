import React from 'react';
import{FaBars} from 'react-icons/fa';
import {
    Nav, 
    NavbarContainer, 
    NavLogo, 
    MobileIcon, 
    NavMenu, 
    NavItem,
    NavLinks,
    NavBtn,
    NavBtnLink
} from './NavbarElements';

/**
 * Navbarcomponent
 * 
 * @param {toggle} param1  Toggle function to show and hide sidebar.
 */
const Navbar = ({toggle}) => {
    return (
        <>
            <Nav data-testid="navbarNav">
                <NavbarContainer data-testid="navbarContainer">
                    <NavLogo to="/" data-testid="navbarLogo">GroupO</NavLogo>
                    <MobileIcon onClick={toggle} data-testid="navbarIcon">
                        <FaBars data-testid="navbarBurger"/>
                    </MobileIcon>
                    <NavMenu data-testid="navbarMenu">
                        <NavItem data-testid="navbarMenuItem">
                            <NavLinks to="/" data-testid="navbarLink">Home</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn data-testid="navbarBtn">
                        <NavBtnLink activeClassName="active" to="/signin" data-testid="navbarBtnLink1">Sign in</NavBtnLink>
                        <NavBtnLink activeClassName="active" to="/signup" data-testid="navbarBtnLink2">Sign up</NavBtnLink>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar
