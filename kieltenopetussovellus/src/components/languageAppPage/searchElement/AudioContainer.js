import React from 'react'
import {
    OneAudioContainer,
    AudioImage,
    AudioTextContainer,
    AudioTitle,
    AudioDescription
}from './AudioContainerElements';
import audio from '../../../images/testi.webm'

const AudioContainer = (props) => {
    return (
        <OneAudioContainer>
            <AudioImage src={props.image} />
            <AudioTextContainer>
                <AudioTitle>{props.title}</AudioTitle>
                <AudioDescription>{props.description}</AudioDescription>
            </AudioTextContainer>
            <audio controls>
                <source src={props.audio} type="audio/webm"/>
            </audio>
        </OneAudioContainer>
    )
}

export default AudioContainer
