import React, { useState } from 'react';
import {
    InfoText,
    FormInput,
    FormButton,
    QuestionAnswerContainer,
    AnswerContainer
} from './ListenElements';

const Quiz = (props) => {
    return (
        <QuestionAnswerContainer>
            <InfoText>Question: {props.question}</InfoText>
            <InfoText>Your answer:</InfoText>
            <FormInput type="text"></FormInput>
            <AnswerContainer>
                {
                    props.showAnswer ?
                        <InfoText>Correct answer: {props.answer}</InfoText> : null
                }
            </AnswerContainer>
        </QuestionAnswerContainer>
    );
};

export default Quiz;