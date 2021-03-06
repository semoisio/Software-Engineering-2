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
    EditButton,
    EditButton2,
} from './MyAudioElements'
import {getFlag} from '../../../tools/flagFunction';
import {calculateRating} from '../searchElement/ratingFunctions';
import ReactStars from "react-rating-stars-component";

const AudioContainer = (props) => {
    const [searching, setSearching] = useState(false);
    const [ratingValue, setRatingValue] = useState(calculateRating(props.rating));

    const clickEdit = () => {
        const audio = {
            "_id": props.id,
            "language": props.language,
            "title": props.title,
            "desc": props.desc,
            "genre": props.genre,
            "difficulty": props.difficulty,
            "quiz": props.quiz,
        };
        props.setSelectedAudio(audio);
        props.setIsOpen(true);
    }


    return (
        <OneAudioContainer>
            <AudioImage src={getFlag(props.language)} />
            <AudioTextContainer>
                <AudioTitle>{props.title}</AudioTitle>
                <AudioDescription>{props.desc}</AudioDescription>
                <ReactStars
                    count={5}
                    size={30}
                    color="#fff"
                    activeColor="#FFC67C"
                    value={ratingValue}
                    edit={false}
                />
            </AudioTextContainer>
            {
                searching ?
                    <Loader type="TailSpin" color="#00BFFF" height={50} width={50} /> :
                    props.id === undefined ?
                        null :
                        <ButtonContainer>
                            <EditButton className="button" onClick={() => clickEdit()}>Edit</EditButton>
                            <EditButton2 className="button2" onClick={() => props.deleteAudio(props.id)}>Delete</EditButton2>
                        </ButtonContainer>
            }

        </OneAudioContainer>
    )
}

export default AudioContainer
/*
useEffect(() => {
const [audioFetched, setAudioFetched] = useState("");
    const [doFetch, setDoFetch] = useState(0);


        const haeAudio = async () => {
            setSearching(true);
            const url = "http://127.0.0.1:3001/audio?file=true&id=" + props.id;
            try {
                const response = await fetch(url).then(r => r.blob());
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


{
                                audioFetched === "" ?
                                    <SearchButton onClick={() => { fireFetch() }}>Listen audio</SearchButton>
                                    :
                                    <AudioPlayer controls>
                                        <source src={audioFetched} type="audio/webm" />
                                    </AudioPlayer>
                            }
*/
