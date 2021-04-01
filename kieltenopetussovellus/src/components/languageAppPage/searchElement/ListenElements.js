import styled from 'styled-components';
import { CONinput } from '../../../tools/colors';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

export const ListenContainer = styled.div`
    display:flex;
    flex-wrap: wrap;

`;

export const InfoContainer = styled.div`
    width: 45%;
    display: flex;
    flex-direction:column;
    margin-left: 1rem;
    margin-right: auto;
    margin-top: 1rem;
    margin-bottom: 1rem;
    transition: all 1s;

    @media screen and (max-width: 768px){
        width: 90%;
        margin-right: 1rem;
    }
`;

export const CommentContainer = styled.div`
    width: 45%;
    display: flex;
    flex-direction: column;
    margin-left: 2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    transition: all 1s;

    @media screen and (max-width: 768px){
        width: 90%;
        margin-left: 1rem;
    }
`;

export const RatingContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
`;

export const InfoText = styled.label`
    margin-bottom: 8px;
`;

export const Title = styled.h1`
`;

export const ListenButton = styled.button`
    width: 20%;
    margin: 0px;
    margin-bottom: 15px;
`;

export const CommentInput = styled.textarea`
    padding: 12px 12px;
    margin-bottom: 15px;
    margin-right:1rem;
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
    width: 60%;
    margin-top: 1rem;
    margin-bottom: 1rem;

    @media screen and (max-width: 768px){
        width: 100%
    }
`;