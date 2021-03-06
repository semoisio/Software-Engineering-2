import styled from 'styled-components';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import {background,CONtext,CONh1,CONinput} from '../../../tools/colors';
import Select from 'react-select';

export const SearchAndListenContainer = styled.div`
    display:flex;
    flex-wrap: wrap;
    min-height:572px;
    padding-left: 10px;
`;

export const SearchContainer = styled.div`
    min-height:80vh;
    width:30%;
    display:flex;
    margin-top: 20px;
    transition: all 1s;

    @media screen and (max-width: 850px){
        position: fixed;
        z-index: 998;
        width: fit-content;
        display: flex;
        opacity: ${({isOpen}) => (isOpen ? '100%' : '0')}; 
        top: ${({isOpen}) => (isOpen ? '80px' : '-100%')};
        bottom: ${({isOpen}) => (isOpen ? 0 : 'none')};
        flex-direction:column;
        width: 100%;
        transition: 0.3s ease-in-out;
        background: ${background};
        overflow:auto;
    }
   
`;

export const SearchResultContainer = styled.div`
    height:80vh;
    width:70%;
    transition: all 1s;
    overflow: auto;
    display:flex;
    flex-direction: column;
    @media screen and (max-width: 850px){
        width:100%;
    }
`;

export const OpenSearchIconContainer = styled.div`
    display: none;
    color: ${CONtext};
    cursor: pointer;
    align-items:center;
    justify-content:center;
    width: 100%;

    @media screen and (max-width: 850px){
        display: flex;
        justify-content:center;
        align-items:center;
    }

    &:hover{
        opacity: 50%;
    }
`;
export const SearchText = styled.h4`
    margin: 0.75rem;
`;

export const OpenIcon = styled(AiFillCaretDown)`
    
`;

export const CloseSearchIconContainer = styled.div`
    display: none;
    color: ${CONtext};
    cursor: pointer;

    @media screen and (max-width: 850px){
        display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
        
        justify-content:center;
        align-items:center;
    }

    &:hover{
        opacity: 50%;
    }
`;

export const CloseIcon = styled(AiFillCaretUp)`
    
`;

// Form
export const Form = styled.form`
    display: flex;
    flex-direction:column;
    width: 100%;    
`;

// Headline for form (Found:)
export const FormH1 = styled.h1`
    margin-top: 15px;
    margin-bottom: 15px;
    color: black;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`;

// Headline for search results (Search audio)
export const FormH2 = styled.h1`
    margin-top: 10px;
    margin-bottom: 35px;
    color: black;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`;

// Labels for diffrent form elements
export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: black;
    margin-left:1rem;
`;

// Styles for inputs
export const FormInput = styled.input`
    padding: 12px 12px;
    margin-bottom: 15px;
    margin-left:1rem;
    margin-right:1rem;
    border: solid 1px ${CONinput};
    border-radius: 4px;
`;

export const SelectContainer = styled.div`
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 15px;
`;

//Styles for form button
export const FormButton = styled.button`
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 15px;
    //cursor: pointer;

    &:hover{
        //background: #68EDCB;
    }
`;

//Styles for form button
export const ClearButton = styled.div`
    background-color: #FE786A;
	box-shadow: 0px 2px 4px #000000;
	padding: 1rem 1rem;
	border: none;
    border-radius: 10px;
	text-decoration: none;
	color: #ffffff;
	text-shadow: 1px 1px 2px #626262;
    font-weight: 400;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	font-size: medium;

	text-align: center;
	margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 15px;
    margin-top: 15px;

    &:hover{
        transition: all 0.1s ease-in-out;
	    background-color: #FE8A7E;
    }
`;

export const LoaderContainer = styled.div`
    display:flex;
    width:100%;
    justify-content:center;
    align-items:center;
    margin-top: auto;
    margin-bottom:auto;
`;

export const LoaderText = styled.h1`
    margin-top: 0;
    margin-right: 1rem;
`;

export const FoundCount = styled.div`
    margin-right: 16px;
    margin-top: 1rem;
    color:${CONh1};
    font-size: 1.1rem;
    display:flex;
    justify-content:space-around;
    align-items: center;
    width:93%;

    @media screen and (max-width: 500px){
        font-size: 0.8rem;
    }

`;
export const WhatPage = styled.label`
color: black;
margin-left: 16px;
margin-right: 30px;
font-size: 14px;
`;


export const PagesContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    
    @media screen and (max-width: 450px){
        font-size: 0.8rem;
        flex-direction: column;
    } 
    
`;
export const PageButton = styled.label`

    margin-right: 16px;
    font-size: 14px;
    color: black;   
    cursor: pointer;

    @media screen and (max-width: 500px){
        font-size: 0.8rem;
    }   

    &:hover{
        opacity:50%;
    }
`;

//t???? j??i kesken, miten napit saa menem????n nurkkiin ?
export const ChooseContainer = styled.div`
    display: flex;
    align-items: center;
    width: 93%;
    justify-content: space-between;
    
`;

export const SortContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin:0;
`;

export const SortInput = styled(Select)`
    min-width: 150px;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 8px;

    @media screen and (max-width: 500px){
        min-width: 100px;
    }
`;

export const ErrorContainer = styled.h1`
    display:flex;
    height:40vh;
    margin-top: 10px;
    margin-bottom: 35px;
    color: black;
    font-size: 20px;
    font-weight: bold;
    justify-content:center;
    align-items:center;
`;
