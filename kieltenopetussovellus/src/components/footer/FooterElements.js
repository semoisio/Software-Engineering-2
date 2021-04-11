import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Footer = styled.footer`
    background:#1EB495;
	padding: 15px;
	height: auto;
	color: #000;
	display: flex;
	flex-direction:row;
	flex-wrap:nowrap;
	justify-content:space-around;
	align-items:center;
`;

export const FooterLink = styled(NavLink)`
    color: #fff;
	font-size: small;
	text-decoration: none;
	text-shadow: 1px 1px 2px #000000;


    &:hover{
        text-decoration: none;
	    color: #FFC67C;
	    text-shadow: 1px 1px 2px #000000;
    }
`;