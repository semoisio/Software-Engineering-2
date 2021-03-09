import React, { useState, useEffect } from 'react';
import Loader from "react-loader-spinner";
import {
    OneAudioContainer,
    AudioImage,
    AudioTextContainer,
    AudioTitle,
    AudioDescription,
} from '../searchElement/AudioContainerElements';
import {
    ButtonContainer,
    SearchButton,
    AudioPlayer,
} from './MyAudioElements'

const AudioContainer = (props) => {
    const [audioFetched, setAudioFetched] = useState("");
    const [doFetch, setDoFetch] = useState(0);
    const [searching, setSearching] = useState(false);

    const clickEdit = () => {
        const audio = { 
            "_id": props.id, 
            "language": props.language, 
            "title": props.title, 
            "desc": props.desc, 
            "genre": props.genre,
            "difficulty": props.difficulty
        };
        props.setSelectedAudio(audio);
    }

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
                <AudioDescription>{props.desc}</AudioDescription>
            </AudioTextContainer>
            {
                searching ?
                    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} /> :
                    props.id === undefined ?
                        null :
                        <ButtonContainer>
                            {
                                audioFetched === "" ?
                                    <SearchButton onClick={() => { fireFetch() }}>Listen audio</SearchButton>
                                    :
                                    <AudioPlayer controls>
                                        <source src={audioFetched} type="audio/webm" />
                                    </AudioPlayer>
                            }
                            <SearchButton onClick={() => clickEdit()}>Edit</SearchButton>
                            <SearchButton onClick={() => props.deleteAudio(props.id)}>Delete</SearchButton>
                        </ButtonContainer>
            }

        </OneAudioContainer>
    )
}

export default AudioContainer
