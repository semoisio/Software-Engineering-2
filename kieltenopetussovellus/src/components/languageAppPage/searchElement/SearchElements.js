import styled from 'styled-components';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import {background,CONtext,CONh1,CONinput,RBbg,RBhover,RBtext,RBshadow } from '../../../tools/colors';

export const SearchAndListenContainer = styled.div`
    display:flex;
    flex-wrap: wrap;
    min-height:80vh;
`;

export const SearchContainer = styled.div`
    min-height:80vh;
    width:30%;
    display:flex;
    transition: all 1s;

    @media screen and (max-width: 768px){
        position: fixed;
        z-index: 998;
        width: 100%;
        height: 87%;
        display: flex;
        opacity: ${({isOpen}) => (isOpen ? '100%' : '0')}; 
        top: ${({isOpen}) => (isOpen ? '80px' : '-100%')};
        flex-direction:column;
        width: 100%;
        transition: 0.3s ease-in-out;
        background: ${background};
        overflow:auto;
    }
   
`;

export const ListenContainer = styled.div`
    height:90vh;
    width:70%;
    transition: all 1s;
    overflow: auto;
    display:flex;
    flex-direction: column;
    @media screen and (max-width: 768px){
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

    @media screen and (max-width: 768px){
        display: flex;
        justify-content:center;
        align-items:center;
    }

    &:hover{
        opacity: 50%;
    }
`;
export const SearchText = styled.h4`
    margin: 0.5rem;
`;

export const OpenIcon = styled(AiFillCaretDown)`
    
`;

export const CloseSearchIconContainer = styled.div`
    display: none;
    color: ${CONtext};
    cursor: pointer;

    @media screen and (max-width: 768px){
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

// Headline for form
export const FormH1 = styled.h1`
    margin-bottom: 15px;
    color: ${CONh1};
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`;

// Labels for diffrent form elements
export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: ${CONh1};
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

export const RadioBtnContainer = styled.div`
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 15px;
`;

//Styles for form button
export const FormButton = styled.button`
    //background: #FFC67C;
    //padding: 16px 0;
    //border: none;
    //border-radius: 4px;
    //color: #fff;
    //font-size: 20px;
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
    display:flex;
    justify-content:center;
    align-items:center;
    background: ${RBbg};
    padding: 0.5rem 0.5rem;
    border: none;
    border-radius: 4px;
    color: ${RBtext};
    font-size: medium;
    margin-left:auto;
    margin-right:1rem;
    margin-bottom: 15px;
    cursor: pointer;
    border-radius: 10px;
    font-weight: 300;
    width:30%;

    &:hover{
        background: ${RBhover   };
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
    margin-left: 16px;
    margin-top: 1rem;
    color:${CONh1};
    font-size: 1.1rem;
    display:flex;
    justify-content:space-around;

    @media screen and (max-width: 500px){
        font-size: 0.8rem;
    }

`;
export const WhatPage = styled.h3`
    margin:0;
    color:${CONh1}; 
    margin-right: 3rem;
`;
export const Found = styled.h3`
    margin:0;
`;

export const PagesContainer = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-around;
    
    @media screen and (max-width: 500px){
        font-size: 0.8rem;
    } 
    
`;
export const PageButton = styled.div`
    font-size: 1.5rem;
    color:${CONh1};
    cursor: pointer;

    &:hover{
        opacity: 50%;
    }

    @media screen and (max-width: 500px){
        font-size: 0.8rem;
    }   
`;