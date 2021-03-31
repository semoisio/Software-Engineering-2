import styled from 'styled-components';
import {CONtext,CONh1} from '../../../tools/colors';

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
      height: 150px;
      width: 150px;
      border-radius: 5px;
      margin:0.8rem;

`;
export const SelectContainer = styled.div`
    margin:0.8rem;
    width: 200px;
`;

// Labels for diffrent form elements
export const FormLabel = styled.label`

    color: ${CONh1};
    margin:0.2rem;
`;

export const FormText = styled.p`

    color: ${CONtext};
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
    margin-bottom: 5px;
    width: 200px;
`;

export const FormButtonDelete = styled.button`
    margin-bottom: 5px;
    //background: red;
    width: 200px;
`;