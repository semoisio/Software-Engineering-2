import styled from 'styled-components';
import React from 'react';
import { ReactMic } from 'react-mic';

// Container for all of the components
export const NewRecordingContainer = styled.div`
    display:flex;
    flex-wrap: wrap;

    @media screen and (max-width: 768px){
        display: flex;
        flex-direction:column;
        width: 100%;
        transition: all 1s;
    }
`;

// Container for recording 
export const RecordingContainer = styled.div`
    width:45%;
    display:flex;
    flex-direction:column;
    margin-right: auto;

    @media screen and (max-width: 768px){
        width: 100%;
        margin-right: 16px;
        display: flex;
        flex-direction:column;
        transition: all 1s;
    }
`;

// React mic
export const RecordingMic = styled(ReactMic)`
    //height:100%;
    margin-right:1rem;
    margin-left:1rem;
    margin-bottom:15px;
`;

// Container for recording buttons
export const RecordingButtonContainer = styled.div`
    display:flex;
    justify-content:left;
`;

// Container for recording info
export const InfoContainer = styled.div`
    width:45%;
    display:flex;
    flex-direction:column;
    //margin: 1rem;

    @media screen and (max-width: 768px){
        display: flex;
        flex-direction:column;
        width: 100%;
        transition: all 1s;
    }
`;

//Recording buttons
export const RecordButton = styled.button`
    width:20%;
    /* background: #FFC67C;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px; */
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom:15px;
    /* cursor: pointer;

    &:hover{
        background: #68EDCB;
    } */
`;

export const AudioPlayer = styled.audio`
    width: auto;
    margin-right:1rem;
    margin-left:1rem;
    margin-bottom:15px;
`;

// Info form
export const RecordingForm = styled.form`
    display: flex;
    flex-direction:column;
    width: 100%;
    justify-content: right;
`;

// Headline for form
export const FormH1 = styled.h1`
    margin-bottom: 15px;
    /* color: #fff;
    font-size: 20px;
    font-weight: 400; */
    text-align: center;
`;

// Labels for diffrent form elements
export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    //color: #fff;
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

//Styles for form button
export const FormButton = styled.button`
    width:20%;
    /* background: #FFC67C;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px; */
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 15px;
    /* cursor: pointer;

    &:hover{
        background: #68EDCB;
    } */
`;
