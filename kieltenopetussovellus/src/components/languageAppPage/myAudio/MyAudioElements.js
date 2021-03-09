import styled from 'styled-components';
import { background, CONtext, CONh1, CONinput, RBbg, RBhover, RBtext, RBshadow } from '../../../tools/colors';

// container for whole page
export const MyAudioContainer = styled.div`
    display:flex;
    flex-wrap: wrap;
    min-height:80vh;
`;

// container for showing user's audios
export const SearchContainer = styled.div`
    width:70%;
    display:flex;
    flex-direction:column;
    margin-right: auto;

    @media screen and (max-width: 768px){
        width: 100%;
        margin-right: 16px;
        display: flex;
        flex-direction:column;
        transition: all 1s;
    }
`;

// container for editing selected audio info
export const EditContainer = styled.div`
    width:30%;
    display:flex;
    flex-direction:column;

    @media screen and (max-width: 768px){
        width: 100%;
        margin-right: 16px;
        display: flex;
        flex-direction:column;
        transition: all 1s;
    }
`;

// container for search buttons
export const ButtonContainer = styled.div`
    width: 20%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;

    @media screen and (max-width: 768px){
        width: 100%;
        margin-right: 16px;
        display: flex;
        flex-direction: row;
        transition: all 1s;
    }
`;

// audio player
export const AudioPlayer = styled.audio`
    width: 100%;
    min-width: 200px;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom:15px;

    @media screen and (max-width: 768px){
        width: 50%;
    }
`;

// search buttons
export const SearchButton = styled.button`
    width: 50%;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom:15px;

    @media screen and (max-width: 768px){
        width: 50%;
    }
`;

// container for edit buttons
export const EditButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-right: 2rem;
`;

// edit buttons
export const EditButton = styled.button`
    width: 40%;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom:15px;
`;

// titles
export const Title = styled.h1`
    margin-left:1rem;
`;

// edit form
export const MyAudioForm = styled.form`
    display: flex;
    flex-direction:column;
    width: 100%;
    justify-content: right;
`;

// Labels for diffrent form elements
export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
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

export const FormDesc = styled.textarea`
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
`;