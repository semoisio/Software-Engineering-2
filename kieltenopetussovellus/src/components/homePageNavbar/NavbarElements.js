import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

// Yläpalkki (header)
export const Nav = styled.nav`
    background: linear-gradient(to right top, #08ffbf, #07ecb5, #0ed9ab, #16c6a0, #1eb495);
    height: 85px;
    //margin-top: -80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    width: 100%;
    margin-right:0;

    @media screen and (max-width: 960px){
        transition: 0.8s all ease;
    }
`;

//Yläpalkin alusta-div
export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
`;

// LOGO
export const NavLogo = styled(NavLink)`
    color: white;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
`;


export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 768px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer; 
        color: #fff;
    }

    &:hover{
        opacity: 80%;
    }
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;

    @media screen and (max-width: 768px){
        display: none;
    }
`;

//Yläpalkin buttonien tausta-div
export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    height: 80px;


    @media screen and (max-width: 768px){
        display: none;
    }
`;

//Yläpalkin Buttonit
export const NavBtnLink = styled(NavLink)`
    color: #fff;
    text-shadow: 1px 1px 2px #626262;
    display: flex;
    align-items: center;
    text-decoration: none;
    //font-variant-caps: small-caps;
    padding: 1.8rem 1rem;
    cursor: pointer;
    font-size: medium;

    &:active{
        border-bottom: 3px solid #FFC67C;
        background: #C3EBC1;
    }
    &:hover{
        transition: all 0.2s ease-in-out;
        background: #1EB495;
    }
    &.${props => props.activeClassName} {
        background: #1EB495;
  }
`;


