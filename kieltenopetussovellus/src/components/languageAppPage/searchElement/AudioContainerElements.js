import styled from 'styled-components';
import {background,CONtext,CONh1,CONinput,OBbg,OBhover,OBtext} from '../../../tools/colors';

export const OneAudioContainer = styled.div`
    width: 93%;
    margin: 1rem;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    border: solid ${CONinput};
    border-radius: 5px;
    padding: 5px;

    @media screen and (max-width: 1210px){
        height: auto;
        justify-content: space-around;
    }

    @media screen and (max-width: 490px){
        height: auto;
        width: 90%;
        padding: 1px;
        flex-direction:column;
    }
`;

export const AudioImage = styled.img`
    width:150px;
    height: 150px;
    border-radius: 10px;
    margin-right: 2rem;
    margin-left: 2rem;

    @media screen and (max-width: 1210px){
        width:150px;
        height: 150px;
    }
`;  

export const AudioTextContainer = styled.div`
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    margin-right: 2rem;
    margin-left: 2rem;
    width: 50%;
`;

export const AudioTitle = styled.h2`
    color: ${CONh1};
    text-align: center;
    word-break: break-all;
`;

export const AudioDescription = styled.p`
    text-align: center;
    color: ${CONtext};
    word-break: break-all;
`;

export const StartAudioBtn = styled.div`
    border-radius: 50px;
    background: ${OBbg};
    white-space: nowrap;
    padding: 1rem 1rem;
    border-radius: 10px;
    color: ${OBtext};
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-top: 1rem;
    text-shadow: 1px 1px 2px #626262;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: ${OBhover};
    }
`;