import styled from 'styled-components';
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";

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
        display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
        //align-items:flex-start;
        flex-direction:column;
        width: 100%;
        transition: all 1s;
    }
   
`;

export const ListenContainer = styled.div`
    height:80vh;
    width:70%;
    transition: all 1s;
    overflow: auto;
    @media screen and (max-width: 768px){
        width:100%;
    }
`;

export const OpenSearchIconContainer = styled.div`
    display: none;
    color: #FFFFFF;
    cursor: pointer;

    @media screen and (max-width: 768px){
        display: ${({ isOpen }) => (isOpen ? 'none' : 'flex')};
        justify-content:center;
        align-items:center;
    }

    &:hover{
        color:#68EDCB;
    }
`;
export const SearchText = styled.h4`
    margin: 0.5rem;
    
`;

export const OpenIcon = styled(AiFillCaretDown)`
    
`;

export const CloseSearchIconContainer = styled.div`
    display: none;
    color: #FFFFFF;
    cursor: pointer;

    @media screen and (max-width: 768px){
        display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
        
        justify-content:center;
        align-items:center;
    }

    &:hover{
        color:#68EDCB;
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
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`;

// Labels for diffrent form elements
export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: #fff;
    margin-left:1rem;
`;

// Styles for inputs
export const FormInput = styled.input`
    padding: 12px 12px;
    margin-bottom: 15px;
    margin-left:1rem;
    margin-right:1rem;
    border: none;
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
    background: #FFC67C;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 15px;
    cursor: pointer;

    &:hover{
        background: #68EDCB;
    }
`;