import styled from 'styled-components';
import {FaTimes} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

export const LanguageSidebarContainer = styled.aside`
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: #E0FFCD;
    display: none;
    align-items: center;
    justify-content: center;
    transition: 0.3s ease-in-out;
    opacity: ${({isOpen}) => (isOpen ? '100%' : '0')}; 
    top: ${({isOpen}) => (isOpen ? '0' : '-100%')};


    @media screen and (max-width: 768px){
        display: flex;
    }
`;

export const CloseIcon = styled(FaTimes)`
    color: #000000;
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
        opacity: 50%;
    }
`;

export const SideBtnWrap = styled.div`
    display:flex;
    flex-direction:column;
    justify-content: center;
`;

export const SideNavBtn = styled(NavLink)`
    display:flex;
    justify-content:center;
    border-radius: 50px;
    background: #FFC67C;
    white-space: nowrap;
    padding: 10px 27px;
    color: #010606;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin: 5px;
    text-decoration: none;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #68EDCB;
    }
`;
