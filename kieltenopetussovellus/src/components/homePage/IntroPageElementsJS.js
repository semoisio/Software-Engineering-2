import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const IntroPageContainer = styled.div`
	min-height: 100vh;
	background: linear-gradient(to right top, #e0ffcd, #c9fbc7, #aef6c5, #8ff2c6, #68edcb);
	display:flex;
	flex-direction:column;

`;

export const IntroPageMain = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap:wrap;
	justify-content: center;
	text-align: center;
	margin-top: auto;
    margin-bottom:auto;
`;

export const IntroLogoDiv = styled.div`
    margin-top: 10px;
	margin-bottom: 10px;
`;

export const IntroLogoImg = styled.img`
    display: block;
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

export const IntroText = styled.div`
	text-align: center;
	padding: 10px;
	overflow-wrap: break-word;
	width: 65%;
	margin: auto;
	color: black;
	margin-top:40px;
	font-size: 18px;
	font-weight: 500;

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
	margin-top:40px;
`;

// Buttonit
export const IntroButton = styled(NavLink)`
    background-color: #FF995E;
	box-shadow: 0px 2px 4px #000000;
	padding: 1rem 1rem;
	width: 10%;
	min-width:100px;
	border: none;
    border-radius: 10px;
	text-decoration: none;
	font-size: medium;
	color: #ffffff;
	text-shadow: 1px 1px 2px #000000;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	white-space:nowrap;

	text-align: center;
	margin: 10px;

    &:hover{
        transition: all 0.1s ease-in-out;
		background-color: #FFC67C;
    }
`;
