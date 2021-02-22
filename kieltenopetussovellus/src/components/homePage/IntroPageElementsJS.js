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
	background-image: linear-gradient(to top, #f0ffef, #e5fae3, #daf5d8, #cef0cc, #c3ebc1);

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
    background-color: #FFDA83;
	box-shadow: 0px 2px 4px #000000;
	padding: 0.5rem 1rem;
	width: 10%;
	border: none;
    border-radius: 3px;
	text-decoration: none;
	font-weight: bold;
	//font-variant-caps: small-caps;
	color: #3E4A3D;
	cursor: pointer;
	transition: all 0.2s ease-in-out;

	text-align: center;
	margin: 10px;

    &:hover{
        transition: all 0.1s ease-in-out;
		opacity: 70%;
    }
`;

export const Footer = styled.footer`
    background:#3E4A3D;
	padding: 15px;
	width: 100%;
	height: auto;
	color: #000;
	display: flex;
	flex-direction:row;
	flex-wrap:nowrap;
	justify-content:space-around;
	margin-top: auto;
`;

export const FooterLink = styled(NavLink)`
    color: #fff;
	font-size: small;
	text-decoration: none;

    &:hover{
        text-decoration: none;
	    color: #FFDA83;
	    text-shadow: 1px 1px 2px #000000;
    }
`;