import styled from 'styled-components';
import { background, CONtext, CONh1, CONinput, RBbg, RBhover, RBtext, RBshadow } from '../../../tools/colors';
import Select from 'react-select';

// container for whole page
export const MyAudioContainer = styled.div`
    display:flex;
    flex-wrap: wrap;
    justify-content: center;
`;

// container for showing user's audios
export const SearchContainer = styled.div`
    display:flex;
    flex-direction:column;
    width: 100%;
    transition: all 0.3s;
    justify-content: center;
    align-items: center;
`;

// container for editing selected audio info
export const EditContainer = styled.div`
    display:flex;
    flex-direction:column;
    position: fixed;
    width: 100%;
    z-index: 998;
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')}; 
    top: ${({ isOpen }) => (isOpen ? '80px' : '-100%')};
    bottom: ${({ isOpen }) => (isOpen ? 0 : null)};
    transition: 0.3s ease-in-out;
    background: ${background};
    overflow: auto;
    transition: all 0.3s;
    min-height:80vh;
`;

// container for search buttons
export const ButtonContainer = styled.div`
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: right;
    align-items: end;
    margin-right: 2rem;

    @media screen and (max-width: 768px){
        width: 100%;
        margin-right: 16px;
        display: flex;
        flex-direction: row;
        transition: all 1s;
        justify-content: center;
    }
`;

// audio player
export const AudioPlayer = styled.audio`
    min-width: 200px;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom:15px;
`;

// search buttons
export const SearchButton = styled.button`
    width: 30%;
    min-width: 75px;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom:15px;
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

export const SortContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 30%;
`;

export const SelectInput = styled(Select)`
    min-width: 150px;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 8px;
`;
