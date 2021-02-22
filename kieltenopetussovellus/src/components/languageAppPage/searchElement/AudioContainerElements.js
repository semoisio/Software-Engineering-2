import styled from 'styled-components';

export const OneAudioContainer = styled.div`
    width: 93%;
    margin: 1rem;
    height: 200px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    border: solid black;
    border-radius: 5px;
    padding: 5px;

    @media screen and (max-width: 1210px){
        height: 380px;
        justify-content: space-around;
    }

    @media screen and (max-width: 490px){
        height: 500px;
        width: 90%;
        padding: 1px;
    }
`;

export const AudioImage = styled.img`
    width:150px;
    height: 80%;
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
    width: 200px;
`;

export const AudioTitle = styled.h2`
    
`;

export const AudioDescription = styled.p`
    //width: 100%;
    
`;

export const StartAudioBtn = styled.div`
    border-radius: 50px;
    background: #FFC67C;
    white-space: nowrap;
    padding: 16px 64px;
    color: #FFFFFF;
    font-size: 16px;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    margin-top: 1rem;

    &:hover{
        transition: all 0.2s ease-in-out;
        background: #fff;
        background: #68EDCB;
    }
`;