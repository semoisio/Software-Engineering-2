import styled from 'styled-components';
import { CONinput } from '../../../tools/colors';

export const ListenContainer = styled.div`
    display:flex;
    flex-wrap: wrap;

    @media screen and (max-width: 768px){
        flex-wrap: wrap;
    }
`;

export const InfoContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction:column;
    transition: all 1s;
    overflow: auto;

    @media screen and (max-width: 768px){
        width: 100%;
    }
`;

export const CommentContainer = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    transition: all 1s;
    overflow: auto;

    @media screen and (max-width: 768px){
        width: 100%;
    }
`;

export const RatingContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    
`;

export const InfoText = styled.label`
    margin-bottom: 8px;
    margin-left: 1rem;
    margin-right: 1rem;
`;

export const Title = styled.h1`
    margin-left: 1rem;
    margin-right: 1rem;
`;

export const ListenButton = styled.button`
    width: 20%;
    margin-bottom: 15px;
    margin-left: 1rem;
    margin-right: 1rem;
`;

export const CommentInput = styled.textarea`
    padding: 12px 12px;
    margin-bottom: 15px;
    margin-left: 1rem;
    margin-right: 1rem;
    border: 2px solid ${CONinput};
    border-radius: 4px;
`;

export const NotFound = styled.img`
    width: 50px;
    height: 50px;
    //border-radius: 10px;
    //margin-right: 2rem;
    //margin-left: 2rem;
`;

export const AudioPlayer = styled.audio`
    margin-top: 1rem;
    margin-bottom: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;
`;

// Labels for diffrent form elements
export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    margin-left: 1rem;
    margin-right: 1rem;
`;

// Styles for inputs
export const FormInput = styled.input`
    padding: 12px 12px;
    margin-bottom: 15px;
    margin-left:1rem;
    margin-right:1rem;
    border-radius: 4px;
`;

//Styles for form button
export const FormButton = styled.button`
    width: 20%;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 15px;
`;

export const QuizContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const QuestionAnswerContainer = styled.div`
    display: flex;
    flex-direction:column;
    margin-bottom: 50px;
`;

export const AnswerContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const StarContainer = styled.div`
    margin-left: 1rem;
    margin-right: 1rem;
`;