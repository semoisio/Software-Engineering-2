import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const IntroPageContainer = styled.div`
    display: flex;
	flex-direction: row;
	flex-flow: row wrap;
	text-align: center;
	flex-wrap: wrap;
	justify-content: center;
	width: 100%;
	min-height: 100vh;
	//position: relative;
	background-image: linear-gradient(to right top, #e0ffcd, #c9fbc7, #aef6c5, #8ff2c6, #68edcb);
`;

export const IntroPageMain = styled.div`
    width: 100%;
	height: 100%;
	padding: 20px;
	display: flex;
	flex-direction: row;
	flex-wrap:wrap;
	justify-content: center;
	text-align: center;
`;

export const IntroLogoDiv = styled.div`
    margin-top: 10px;
	margin-bottom: 10px;
`;

export const IntroLogoImg = styled.img`
    display: block;
    margin: 0 auto;
`;

export const IntroH1 = styled.h1`
    margin-bottom: 10px;
	color: white;
	font-size: 60px;
	font-family: Verdana;
	text-align: center;
	padding: 10px;
	text-shadow: 2px 2px 4px #000000;

	@media screen and (max-width: 768px){
        font-size: 30px;
    }
`;

export const IntroText = styled.p`

	text-align: center;
	padding: 10px;
	overflow-wrap: break-word;
	width: 60%;
	margin: auto;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
	color: black;

	@media screen and (max-width: 768px){
        width:80%;
    }
`;


//Buttonien tausta nav
export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    width: 100%;
	justify-content:center;
	text-align: center;
	flex-wrap: wrap;
`;

// Buttonit
export const IntroButton = styled(NavLink)`
    background-color: #FF995E;
	box-shadow: 0px 2px 4px #000000;
	padding: 12px;
	width: 10%;
	border: none;
    border-radius: 3px;
    //padding: 15px 60px;
	text-decoration: none;
	color: white;
	//font-family: Verdana, Geneva, Tahoma, sans-serif;
	text-shadow: 1px 1px 2px #000000;
	//font-size: small;

	//display: inline-block;
	text-align: center;
	margin: 10px;

    &:hover{
        background-color: #1CE4B0;
    }
	//@media screen and (max-width: 768px){
    //    font-size: 30px;
    //}
`;

export const Footer = styled.footer`
    background:#E0FFCD;
	padding: 15px;
	width: 100%;
	height: auto;
	color: #000;
	display: flex;
	flex-direction:row;
	flex-wrap:nowrap;
	justify-content:space-around;
	//position: absolute;
	//bottom: 0;
	margin-top: auto;
`;

export const FooterLink = styled(NavLink)`
    color: black;
	font-family: Verdana, Geneva, Tahoma, sans-serif;
	font-size: 14px;
	text-decoration: none;

    &:hover{
        text-decoration: none;
	    color: #fff;
	    text-shadow: 1px 1px 2px #000000;
    }
`;