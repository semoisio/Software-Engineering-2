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
import { getFlag } from '../../../tools/flagFunction';
import ReactStars from "react-rating-stars-component";
import { getRating, calculateRating, addRating } from './ratingFunctions';
import { CONh1 } from '../../../tools/colors';

const AudioContainer = (props) => {
    const [audioFetched, setAudioFetched] = useState("");
    const [doFetch, setDoFetch] = useState(0);
    const [searching, setSearching] = useState(false);
    const [ratingValue, setRatingValue] = useState(calculateRating(props.rating));

    useEffect(() => {
        /*
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
        */
        if (doFetch > 0) {
            props.setListening(true);
            props.setSelectedAudio(props.id);
        }
    }, [doFetch]);

    const fireFetch = () => {
        setDoFetch(doFetch + 1);
    }

    return (
        <OneAudioContainer>
            <AudioImage src={getFlag(props.image)} />
            <AudioTextContainer>
                <AudioTitle>{props.title}</AudioTitle>
                <AudioDescription>{props.description}</AudioDescription>
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
                    //props.id === undefined ?
                    //null :
                    //audioFetched === "" ?
                    <StartAudioBtn onClick={() => fireFetch()}>Listen audio</StartAudioBtn>
                //:
                //<audio controls>
                //    <source src={audioFetched} type="audio/webm" />
                //</audio>
            }

        </OneAudioContainer>
    )
}

export default AudioContainer;
