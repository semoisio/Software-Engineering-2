import styled from 'styled-components';

export const LanguageNav = styled.div`
    background: #E0FFCD;
    height: 80px;
    //margin-top: -80px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 1rem;
    position: fixed;
    top: 0;
    width:100%;
    z-index: 10;

    @media screen and (max-width: 960px){
        transition: 0.8s all ease;
    }
    @media screen and (max-width: 768px){
        justify-content:flex-start;
    }
`;

export const Logo = styled.div`
    color: #000000;
    font-size: 1.5rem;
    font-weight: bold;
    width:20%;
    margin-left:2rem;
`;
export const NavBtnWrapper = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    width:80%;
    margin-right: 2rem;

    @media screen and (max-width: 768px){
        display:none;
    }
`;

export const NavBtn = styled.div`
    border-radius: 50px;
    background: #FFC67C;
    white-space: nowrap;
    padding: 10px 27px;
    color: #010606;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    margin: 5px;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        color: #68EDCB;
    }
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
        color: #000000;
    }

    &:hover{
        opacity: 50%;
    }
`;
