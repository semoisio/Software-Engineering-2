import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

//Container for the whole page
export const Container = styled.nav`
    min-height: 100vh;
    background: #fbfbfb;
`;

//Wrapper for content
export const FormWrap = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: auto;

    @media screen and (max-width: 400px){
        height: 80%;
    };
`;

// NavLink styled Icon
export const Icon = styled(NavLink)`
    margin-left: 32px;
    margin-top: 32px;
    margin-bottom: 32px;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 32px;
    width: 20px;

    @media screen and (max-width: 400px){
        margin-left: 17px;
        margin-top: 8px;
    };
`;

//Wrapper for form
export const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top:1rem;

    @media screen and (max-width: 400px){
        padding: 10px;
    };
`;

// Form
export const Form = styled.form`
    max-width: 400px;
    height: auto;
    width: 100%;
    z-index: 1;
    display: flex;
    flex-direction:column;
    margin: 0 auto;
    padding: 80px 32px;
    border-radius: 4px;
    
    @media screen and (max-width: 400px){
        padding: 10px 10px;
    };
    @media screen and (max-width: 340px){
        padding: 5px 1px;
        max-width: 200px;
    };

    @media screen and (max-width: 500px){
        max-width: 300px;
    };
`;

// Headline for form
export const FormH1 = styled.h1`
    margin-bottom: 40px;
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
`;

// Styles for inputs
export const FormInput = styled.input`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: 1px solid #BFBFBF;
    border-radius: 4px;

    &:focus{
        outline: none;
        border: 1px solid black;
        border-radius: 4px;
    }
`;

//Styles for form button
export const FormButton = styled.button`
    width: 50%;
    align-self: center;
`;

// If needed text area
export const Text = styled.span`
    text-align: center;
    margin-top: 24px;
    color: #FE8A7E;
    font-size: 14px;
`;