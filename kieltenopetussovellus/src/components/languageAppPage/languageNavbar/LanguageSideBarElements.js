import styled from 'styled-components';
import {FaTimes} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const LanguageSidebarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: linear-gradient(to right top, #e0ffcd, #c9fbc7, #aef6c5, #8ff2c6, #68edcb);
    display: none;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    transition: 0.3s ease-in-out;
    opacity: ${({isOpen}) => (isOpen ? '100%' : '0')}; 
    top: ${({isOpen}) => (isOpen ? '0' : '-100%')};

    @media screen and (max-width: 850px){
        display: flex;
    }
`;

export const CloseIcon = styled(FaTimes)`
    color: #fff;
`;

export const Icon = styled.div`
    position: absolute;
    top: 1.2rem;
    right: 1.5rem;
    background: transparent;
    font-size: 2rem;
    cursor: pointer;
    outline: none;

    &:hover{
        opacity: 80%;
    }
`;

export const SideBtnWrap = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
    align-items:center
`;

export const SideNavBtn = styled(NavLink)`
    background-color: #FF995E;
    box-shadow: 1px 1px 2px #626262;
	padding: 1rem 1rem;
	border: none;
    border-radius: 30px;
	text-decoration: none;
	font-weight: 300;
	color: #ffffff;
	text-shadow: 1px 1px 2px #626262;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	font-size: medium;
	text-align: center;
    margin-top: 1rem;
    width: 100%;

    &:hover{
        transition: all 0.1s ease-in-out;
	    background-color: #FFC67C;
    }
`;

export const SideNavBtnLogOut = styled.div`
    box-shadow: 1px 1px 2px #626262;
	padding: 1rem 1rem;
	border: none;
    border-radius: 30px;
	text-decoration: none;
	font-weight: 300;
	color: #ffffff;
	text-shadow: 1px 1px 2px #626262;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	font-size: medium;
	text-align: center;
    margin-top: 1rem;
    width: 100%;

    &:hover{
        transition: all 0.1s ease-in-out;
	    background-color: #FE8A7E;
    }
`;
