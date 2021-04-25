import styled from 'styled-components';
import {background,CONtext,CONh1,CONinput,OBbg,OBhover,OBtext} from '../../../tools/colors';

export const OneAudioContainer = styled.div`
    width: 93%;
    margin-left: 1rem;
    margin-right: 1rem;
    margin-bottom: 1rem;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    background-color: #E8E8E8;
    border-radius: 5px;

    /* @media screen and (max-width: 1210px){
        height: auto;
        justify-content: space-around;
    } */

    @media screen and (max-width: 910px){
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
    margin-top:1rem;
    margin-bottom: 1rem;
    margin-left:0.5rem;

    @media screen and (max-width: 1117px){
        width:100px;
        height: 100px;
    }
    @media screen and (max-width: 910px){
        width:70px;
        height: 70px;
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

export const AudioTitle = styled.h1`
    word-break: normal;
    color: black;
    font-size: 20px;
    font-weight: bold;
    text-align: center;

    @media screen and (max-width: 1117px){
        font-size: 85%;
    }
    @media screen and (max-width: 910px){
        height: auto;
        width: 160%;
        padding: 1px;
    }
`;

export const AudioDescription = styled.p`
    text-align: center;
    color: ${CONtext};
    word-break: normal;

    @media screen and (max-width: 1117px){
        font-size: 80%;
    }

    @media screen and (max-width: 910px){
        height: auto;
        width: 160%;
        padding: 1px;
    }
`;

export const StartAudioBtn = styled.button`
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
    transition: all 0.1s ease-in-out;
    text-decoration: none;
    margin-top: 1rem;
    text-shadow: 1px 1px 2px #626262;

    &:hover{
        transition: all 0.1s ease-in-out;
        background: ${OBhover};
    }

    @media screen and (max-width: 1117px){
        font-size: 80%;
    }
`;