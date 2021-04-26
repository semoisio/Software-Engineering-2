import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const LanguageNav = styled.nav`
    background: linear-gradient(to right top, #08ffbf, #07ecb5, #0ed9ab, #16c6a0, #1eb495);
    height: 85px;
    //margin-top: -80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    width:100%;
    z-index: 10;
    margin-right:0;

    @media screen and (max-width: 960px){
        transition: 0.8s all ease;
    }
    /* @media screen and (max-width: 768px){
        justify-content:flex-start;
    } */
`;

//LOGO
export const Logo = styled.div`
    color: white;
    justify-self: flex-start;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
    text-shadow: 1px 1px 2px #626262;
`;

//Yläpalkin buttonien tausta-nav
export const NavBtnWrapper = styled.nav`
    display:flex;
    align-items: center;
    width:80%;
    height: 80px;
    flex-direction:row;
    justify-content: flex-end;
    font-size: 1.2rem;

    @media screen and (max-width: 850px){
        display:none;
    }
`;

//Yläpalkin buttonit
export const NavBtn = styled(NavLink)`
    color: #fff;
    text-shadow: 1px 1px 2px #626262;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 1.8rem 1rem;
    cursor: pointer;
    
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

export const SINavBtn = styled.button`
    color: #fff;
    font-size: 95%;
    text-shadow: 1px 1px 2px #626262;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 1.8rem 1rem;
    cursor: pointer;
    margin: 0;
    
    &:active{
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

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 850px){
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
        opacity: 50%;
    }
`;
