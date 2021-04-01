import styled from 'styled-components';
import { NAVbg, CONinput, background } from '../tools/colors';

export const DialogContainer = styled.div`
    z-index: 999;
    display: flex;
    flex-direction: column;
    width: 400px;
    height: 200px;
    border: 4px ${CONinput} solid;
    border-radius: 4px;
    background: ${background};
`;

export const TitleContainer = styled.div`
    display: flex;
    background: ${NAVbg};
    padding: 0px;
`;

export const DialogTitle = styled.h3`
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 4px;
    margin-right: 4px;
`;


export const MessageContainer = styled.div`
    display: flex;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 4px;
    margin-right: 4px;
    text-align: left;
`;

export const DialogMessage = styled.p`
    margin-left: 4px;
    margin-right: 4px;
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

export const DialogButton = styled.button`
    width: 20%;
    margin-left: 10px;
    margin-right: 10px;
`;


