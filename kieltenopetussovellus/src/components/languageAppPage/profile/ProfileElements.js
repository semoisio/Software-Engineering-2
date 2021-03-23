import styled from 'styled-components';
import {background,CONtext,CONh1,CONinput,RBbg,RBhover,RBtext,RBshadow } from '../../../tools/colors';

export const ProfileContainer = styled.div`
    display:flex;
    //align-items:center;
    justify-content:center;
    min-height: 100vh;
`;
export const Username = styled.h1`
      text-align:center;
      margin:0.2rem;
`;

export const Learn = styled.h3`
      text-align:center;
      margin:0.2rem;
`;
export const UserContainer = styled.div`
      display:flex;     
      justify-content:center;
      flex-direction:column;
      align-items:center;
      width: 280px;
`;

export const UserImage = styled.img`
      height: 100px;
      width: 100px;
      border-radius: 5px;
      margin:0.2rem;
`;
export const SelectContainer = styled.div`
    margin:0.2rem;
    width: 270px;
`;

// Labels for diffrent form elements
export const FormLabel = styled.label`

    color: ${CONh1};
    margin:0.2rem;
`;

// Styles for inputs
export const FormInput = styled.input`
    padding: 12px 12px;
    margin-bottom: 15px;
    margin-left:1rem;
    margin-right:1rem;
    border: solid 1px ${CONinput};
    border-radius: 4px;
    width: 245px;
`;


export const FormButton = styled.button`
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 15px;
`;

export const FormButtonDelete = styled.button`
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 15px;
    background: red;
`;