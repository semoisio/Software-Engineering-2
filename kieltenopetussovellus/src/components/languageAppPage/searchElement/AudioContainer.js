import React, { useState, useEffect } from 'react';
import Loader from "react-loader-spinner";
import {
    OneAudioContainer,
    AudioImage,
    AudioTextContainer,
    AudioTitle,
    AudioDescription,
    StartAudioBtn
} from './AudioContainerElements';

const AudioContainer = (props) => {
    const [audioFetched, setAudioFetched] = useState("");
    const [doFetch, setDoFetch] = useState(0);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        const haeAudio = async () => {
            setSearching(true);
            const url = "http://127.0.0.1:3001/audio?file=true&id=" + props.id;
            try {
                const response = await fetch(url).then(r => r.blob());
                console.log(URL.createObjectURL(response))
                setAudioFetched(URL.createObjectURL(response));
                setSearching(false);

            } catch {
                console.log("errors")
                setSearching(false);
            }

        }
        if (doFetch > 0) {
            haeAudio();
        }
    }, [doFetch]);

    const fireFetch = () => {
        setDoFetch(doFetch + 1);
    }
    return (
        <OneAudioContainer>
            <AudioImage src={props.image} />
            <AudioTextContainer>
                <AudioTitle>{props.title}</AudioTitle>
                <AudioDescription>{props.description}</AudioDescription>
            </AudioTextContainer>
            {
                searching ?
                    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} /> :
                    props.id === undefined ?
                        null :
                        audioFetched === "" ?
                            <StartAudioBtn onClick={() => { fireFetch() }}>Listen audio</StartAudioBtn>
                            :
                            <audio controls>
                                <source src={audioFetched} type="audio/webm" />
                            </audio>
            }

        </OneAudioContainer>
    )
}

export default AudioContainer;
