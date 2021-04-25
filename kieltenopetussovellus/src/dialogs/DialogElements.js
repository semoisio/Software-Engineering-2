import styled from 'styled-components';
import { NAVbg, CONinput, background } from '../tools/colors';

export const DialogContainer = styled.div`
    z-index: 999;
    display: flex;
    flex-direction: column;
    width: 280px;
    height: 200px;
    border: 0.5px black solid;
    border-radius: 4px;
    background: ${background};

`;

export const TitleContainer = styled.div`
    display: flex;
    background: ${NAVbg};
    height: 30px;
    padding: 0px;
    text-transform: uppercase;
`;

export const DialogTitle = styled.h3`
    margin: auto;
    text-align: center;
    color: #FFF;
	text-shadow: 1px 1px 2px #626262;
    font-weight: 500;
`;


export const MessageContainer = styled.div`
    display: flex;
    margin: auto;
    text-align: center;
    word-break: normal;

`;

export const DialogMessage = styled.p`
    margin-left: 4px;
    margin-right: 4px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

export const DialogButton = styled.button`
    width: 30%;
    margin-left: 10px;
    margin-right: 10px;
`;


