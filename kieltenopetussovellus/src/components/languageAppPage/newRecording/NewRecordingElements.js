import styled from 'styled-components';
import React from 'react';
import { ReactMic } from 'react-mic';
import { CONinput } from '../../../tools/colors';

// Container for all of the components
export const NewRecordingContainer = styled.div`
    display:flex;
    justify-content:center;
    min-height: 90vh;
`;

// Container for recording 
export const RecordingContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    display:flex;
    flex-direction:column;
`;

// React mic
export const RecordingMic = styled(ReactMic)`
    margin-right:1rem;
    margin-left:1rem;
    margin-bottom:15px;
    border: solid 1px ${CONinput};
    border-radius: 10px;
`;

// Container for recording buttons
export const RecordingButtonContainer = styled.div`
    display:flex;
    justify-content:center;
`;

// Container for recording info
export const InfoContainer = styled.div`
    width: 100%;
    max-width: 1200px;
    display:flex;
    flex-direction:column;
    
`;

//Recording buttons
export const RecordButton = styled.button`
    width:20%;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom:15px;
`;

export const AudioPlayer = styled.audio`
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
    color: black;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
`;

// Labels for diffrent form elements
export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: black;
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

//Styles for form button
export const FormButton = styled.button`
    width:20%;
    margin-left:1rem;
    margin-right:1rem;
    margin-bottom: 15px;
`;

export const UploadButtonContainer = styled.div`
    display:flex;
    flex-direction: row;
    justify-content: center;
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
    margin-bottom: 15px;
    padding-top: 1rem;
    padding-bottom: 1rem;
`;
