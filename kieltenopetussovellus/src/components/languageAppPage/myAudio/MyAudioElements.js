import styled from 'styled-components';
import { background, CONtext, CONh1, CONinput, RBbg, RBhover, RBtext, RBshadow } from '../../../tools/colors';
import Select from 'react-select';

// container for whole page
export const MyAudioContainer = styled.div`
    display:flex;
    flex-wrap: wrap;
    //justify-content: center;
    align-items:center;
    flex-direction:column;
    min-height:592px;
`;

// container for showing user's audios
export const SearchContainer = styled.div`
    display:flex;
    flex-direction:column;
    //z-index: 1;
    width: 100%;
    transition: all 0.3s;
    justify-content: center;
    align-items: center;
    max-width: 1200px;
`;

// container for editing selected audio info
export const EditContainer = styled.div`
    display:flex;
    flex-direction:column;
    position: fixed;
    align-items:center;
    //z-index: 2;
    width: 100%;
    opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')}; 
    top: ${({ isOpen }) => (isOpen ? '80px' : '-1400px')};
    bottom: ${({ isOpen }) => (isOpen ? 0 : 'none')};
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
    align-items: center;
    


    /* @media screen and (max-width: 768px){
        display: flex;
        flex-direction: row;
        transition: all 1s;
        justify-content: center;
    } */
`;

// audio player
export const AudioPlayer = styled.audio`
    min-width: 200px;
    margin-left:auto;
    margin-right:auto;
    margin-bottom:15px;
`;

// search buttons
export const SearchButton = styled.button`
    width: 40%;
    min-width: 75px;
    margin-left:auto;
    margin-right:auto;
    margin-bottom:15px;
`;

// container for edit buttons
export const EditButtonContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: start;
    align-items: flex-start;
    margin-right: 1rem;
    margin-left:1rem;
`;

// edit buttons
export const EditButton = styled.button`
    width: 40%;
    min-width: 75px;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom:15px;
`;
// edit buttons
export const EditButton2 = styled.button`
    width: 40%;
    margin-right:1rem;
    margin-bottom:15px;
    min-width: 75px;
`;

// titles
export const Title = styled.h1`
    margin-left:1rem;
    text-align:center;
    color: black;
    font-size: 20px;
    font-weight: bold;
`;

// edit form
export const MyAudioForm = styled.form`
    display: flex;
    flex-direction:column;
    width: 100%;
    justify-content: right;
    max-width: 1200px;
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
    border: solid 1px ${CONinput};
    border-radius: 4px;
`;

export const FormDesc = styled.textarea`
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
    @media screen and (max-width: 850px){
        width: 250px;
    }
`;

export const SelectInput = styled(Select)`
    min-width: 150px;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 8px;
`;

export const QuizContainer = styled.div`
    display: flex;
    flex-direction:column;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 15px;
`;

export const QuizCheck = styled.input`
    margin-right: 10px;
`;

export const QuestionAnswer = styled.div`
    display: flex;
    flex-direction:column;
    background: #E8E8E8;
    border-radius: 4px;
    margin-bottom: 15px;
    padding-top: 1rem;
    padding-bottom: 1rem;
`;

export const FooterDiv = styled.div`
    width:100%;
`;
