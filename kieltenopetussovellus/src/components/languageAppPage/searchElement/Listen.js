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

} from './ListenElements';
import Comment from './Comment';
import { genreOptions, languageOptions, difficultyOptions } from '../../../tools/defaultOptions';


const Listen = (props) => {
    // current user
    const [username, setUsername] = useState(localStorage.getItem("user"));
    // return to search if back > 0
    const [back, setBack] = useState(0);
    // while searching show spinner
    const [searching, setSearching] = useState(false);
    // audio (file) that is fetched when this component is loaded
    const [audioFetched, setAudioFetched] = useState("");
    // information of audio
    const [audioInfo, setAudioInfo] = useState(null);
    // comment written by user
    const [commentText, setCommentText] = useState("");
    // comment array
    const [commentArray, setCommentArray] = useState([[]]);

    const commentTextChanged = (e) => {
        setCommentText(e.target.value);
    }

    const changeAudioInfo = (audio) => {
        let difficulty = difficultyOptions.find(x => x.value === audio.difficulty);
        let language = languageOptions.find(x => x.value === audio.language);
        let genre = genreOptions.find(x => x.value === audio.genre);

        audio.difficulty = difficulty.label;
        audio.language = language.label;
        audio.genre = genre.label;
        setAudioInfo(audio);
        setCommentArray(audio.comments);
    };

    const haeAudioFile = async () => {
        setSearching(true);
        const url = "http://127.0.0.1:3001/audio?file=true&id=" + props.id;
        try {
            const response = await fetch(url).then(r => r.blob());
            if (response.type !== "application/json; charset=utf-8") {
                setAudioFetched(URL.createObjectURL(response));
            }
            setSearching(false);

        } catch {
            console.log("errors")
        }
        finally {
            setSearching(false);
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
                haeAudioFile();
                setSearching(false);
            }
            else {
                setSearching(false);
            }
        } catch {
            console.log("errors")
            setSearching(false);
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
        console.log(result)
        if (result.status === "OK") {
            haeAudioInfo();
            setCommentText("");
        }
    }

    useEffect(() => {
        if (props.id !== null) {
            haeAudioInfo();
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
                    key = {index}
                    username = {t.username}
                    comment = {t.comment}
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
                        audioFetched === "" ?
                            null :
                            <ListenContainer>
                                <InfoContainer>
                                    <Title>{audioInfo.title}</Title>
                                    <InfoText>Recorded by {audioInfo.username}</InfoText>
                                    <InfoText>Description: {audioInfo.desc}</InfoText>
                                    <InfoText>Difficulty: {audioInfo.difficulty}</InfoText>
                                    <InfoText>Language: {audioInfo.language}</InfoText>
                                    <InfoText>Genre: {audioInfo.genre}</InfoText>
                                    <audio controls>
                                        <source src={audioFetched} type="audio/webm" />
                                    </audio>
                                    <ListenButton onClick={() => clickBack()}>Back</ListenButton>
                                </InfoContainer>
                                <CommentContainer>
                                    <InfoText>Comments:</InfoText>
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
