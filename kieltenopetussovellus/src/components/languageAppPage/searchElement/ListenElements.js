import styled from 'styled-components';
import {CONinput} from '../../../tools/colors';

export const ListenContainer = styled.div`
    width: 50%;
    display:flex;
    flex-wrap: wrap;
    flex-direction:column;
    margin: auto;
`;

export const InfoContainer = styled.div`
    display: flex;
    flex-direction:column;
    
`;

export const CommentContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const RatingContainer = styled.div`

`;

export const InfoText = styled.label`
    margin-bottom: 8px;
`;

export const Title = styled.h1`
`;

export const ListenButton = styled.button`
    width: 20%;
`;

export const CommentInput = styled.textarea`
    padding: 12px 12px;
    margin-bottom: 15px;
    margin-left:1rem;
    margin-right:1rem;
    border: 2px solid ${CONinput};
    border-radius: 4px;
`;