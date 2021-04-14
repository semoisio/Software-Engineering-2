import React, { useState } from 'react';
import {
    InfoText,
    QuestionContainer,
    QuestionAnswerContainer,
    AnswerContainer,
    AnswerInput,
    ListenButton
} from './ListenElements';

const Quiz = (props) => {
    const [answer, setAnswer] = useState(false);
    const clickShowAnswers = () => {
        setAnswer(true);
    }
    const clickHideAnswers = () => {
        setAnswer(false);
    }
    return (
        <QuestionAnswerContainer>
            <InfoText>Question: {props.question}</InfoText>
            <QuestionContainer>
                <InfoText>Your answer:</InfoText>
                <AnswerInput type="text" maxLength="100"></AnswerInput>
            </QuestionContainer>
            {
                answer ?
                    <AnswerContainer>
                        <ListenButton onClick={() => clickHideAnswers()}>Hide answer</ListenButton>
                        <InfoText>Correct answer: {props.answer}</InfoText>
                    </AnswerContainer> :
                    <AnswerContainer>
                        <ListenButton onClick={() => clickShowAnswers()}>Show answer</ListenButton>
                    </AnswerContainer>
            }
        </QuestionAnswerContainer>
    );
};

export default Quiz;