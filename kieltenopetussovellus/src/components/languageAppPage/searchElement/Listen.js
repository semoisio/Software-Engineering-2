import React, { useState, useEffect } from 'react';
import Loader from "react-loader-spinner";
import {
    ListenContainer,
    InfoContainer,
    InfoText,
    Title,
    ListenButton,
    CommentInput,
    CommentContainer,
    NotFound,
    AudioPlayer,
    RatingContainer,
} from './ListenElements';
import Comment from './Comment';
import { genreOptions, languageOptions, difficultyOptions } from '../../../tools/defaultOptions';
import notFound from '../../../images/notFound.png';
import ReactStars from "react-rating-stars-component";
import { CONh1 } from '../../../tools/colors';
import { getRating, calculateRating, addRating } from './ratingFunctions';


const Listen = (props) => {
    // current user
    const [username, setUsername] = useState(localStorage.getItem("user"));
    // return to search if back > 0
    const [back, setBack] = useState(0);
    // while searching show spinner
    const [searching, setSearching] = useState(false);
    // fetching audio file
    const [fetching, setFetching] = useState(false);
    // audio (file) that is fetched when this component is loaded
    const [audioFetched, setAudioFetched] = useState("");
    // information of audio
    const [audioInfo, setAudioInfo] = useState(null);
    // comment written by user
    const [commentText, setCommentText] = useState("");
    // comment array
    const [commentArray, setCommentArray] = useState([[]]);
    // user's rating
    const [userRating, setUserRating] = useState(0);
    // total rating
    const [ratingValue, setRatingValue] = useState(0);

    const commentTextChanged = (e) => {
        setCommentText(e.target.value);
    }

    const updateRating = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: props.id,
                rating: audioInfo.rating
            })
        };
        const url = "http://127.0.0.1:3001/audio/";
        const response = await fetch(url, requestOptions);
        let result = await response.json();
        if (result.status === "OK") {
            haeAudioInfo();
        }
    }

    const userRatingChanged = (newRating) => {
        setUserRating(newRating);
        addRating(username, newRating, audioInfo.rating);
        updateRating();
    }

    const changeAudioInfo = (audio) => {
        let difficulty = difficultyOptions.find(x => x.value === audio.difficulty);
        let language = languageOptions.find(x => x.value === audio.language);
        let genre = genreOptions.find(x => x.value === audio.genre);
        if (difficulty) {
            audio.difficulty = difficulty.label;
        }
        if (language) {
            audio.language = language.label;
        }
        if (genre) {
            audio.genre = genre.label;
        }
        setAudioInfo(audio);
        if (audio.comments) {
            setCommentArray(audio.comments);
        }
        if (audio.rating) {
            setRatingValue(calculateRating(audio.rating));
            let userHasRated = getRating(username, audio.rating);
            if (userHasRated > 0) {
                setUserRating(userHasRated);
            }
        }
    };

    const haeAudioFile = async () => {
        setFetching(true);
        const url = "http://127.0.0.1:3001/audio?file=true&id=" + props.id;
        try {
            const response = await fetch(url).then(r => r.blob());
            if (response.type !== "application/json; charset=utf-8") {
                setAudioFetched(URL.createObjectURL(response));
            }

        } catch {
            console.log("errors")
        }
        finally {
            setFetching(false);
        }
        
    };

    const haeAudioInfo = async () => {
        setSearching(true);
        const url = "http://127.0.0.1:3001/audio?id=" + props.id;
        try {
            const response = await fetch(url);
            const result = await response.json();
            if (result.status === "OK") {
                changeAudioInfo(result.found[0]);
            }
        } catch (error) {
            console.log("errors")
        }
        finally {
            setSearching(false);
        }
    };

    const addComment = async () => {
        audioInfo.comments.push({
            username: username,
            comment: commentText
        })
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                _id: props.id,
                comments: audioInfo.comments
            })
        };
        const url = "http://127.0.0.1:3001/audio/";
        const response = await fetch(url, requestOptions);
        let result = await response.json();
        if (result.status === "OK") {
            haeAudioInfo();
            setCommentText("");
        }
    }

    useEffect(() => {
        if (props.id !== null) {
            haeAudioInfo();
            haeAudioFile();
        }
    }, []);

    useEffect(() => {
        if (back > 0) {
            props.setListening(false);
        }
    }, [back]);

    const clickBack = () => {
        setBack(back + 1);
    };

    const Comments = () => {
        if (audioInfo !== null) {
            if (commentArray.length > 0) {
                let comments = commentArray.map((t, index) => {
                    return <Comment
                        key={index}
                        username={t.username}
                        comment={t.comment}
                    />
                });
                return comments;
            }
            else {
                return <InfoText>No comments have been made</InfoText>;
            }
        }
        else {
            return null;
        }
    }

    const clickSend = () => {
        if (commentText.length > 0 && audioInfo !== null) {
            addComment();
        }
    }


    return (
        <>
            {
                props.id === null ? null :
                    searching ?
                        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} /> :
                        audioInfo === null ? <InfoText>Something went wrong...</InfoText> :
                            <ListenContainer>
                                <InfoContainer>
                                    <Title>{audioInfo.title}</Title>
                                    <InfoText>Recorded by {audioInfo.username}</InfoText>
                                    <InfoText>Description: {audioInfo.desc}</InfoText>
                                    <InfoText>Difficulty: {audioInfo.difficulty}</InfoText>
                                    <InfoText>Language: {audioInfo.language}</InfoText>
                                    <InfoText>Genre: {audioInfo.genre}</InfoText>
                                    <InfoText>Rating:</InfoText>
                                    <ReactStars
                                        count={5}
                                        size={30}
                                        activeColor={CONh1}
                                        value={ratingValue}
                                        edit={false}
                                    />
                                    {
                                        fetching ? 
                                        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} /> :
                                        audioFetched === "" ?
                                            <InfoText>
                                                <NotFound src={notFound}></NotFound>
                                            File not found
                                            </InfoText> :
                                            <AudioPlayer controls>
                                                <source src={audioFetched} type="audio/webm" />
                                            </AudioPlayer>
                                    }
                                    <RatingContainer>
                                        <InfoText>Rate audio:</InfoText>
                                        <ReactStars
                                            count={5}
                                            onChange={userRatingChanged}
                                            size={30}
                                            activeColor={CONh1}
                                            value={userRating}
                                        />
                                    </RatingContainer>
                                    <ListenButton onClick={() => clickBack()}>Back</ListenButton>
                                </InfoContainer>
                                <CommentContainer>
                                    <Title>Comments:</Title>
                                    <Comments />
                                    <InfoText>Give comments about audio:</InfoText>
                                    <CommentInput value={commentText} onChange={(e) => commentTextChanged(e)}></CommentInput>
                                    <ListenButton onClick={() => clickSend()}>Send</ListenButton>
                                </CommentContainer>
                            </ListenContainer>
            }
        </>
    );
}

export default Listen;
