import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Loader from "react-loader-spinner";
import audioimage from '../../../images/AudioWave.jpg';
import notFound from '../../../images/notFound.png';
import { genreOptions, languageOptions, difficultyOptions } from '../../../tools/defaultOptions';

import {
    MyAudioContainer,
    SearchContainer,
    EditContainer,
    ButtonContainer,
    Title,
    MyAudioForm,
    FormLabel,
    FormInput,
    SelectContainer,
    FormDesc,
    FoundCount,
    LoaderContainer,
    LoaderText,
    EditButton,
    EditButtonContainer,
    AudioPlayer
} from './MyAudioElements';
import {
    PagesContainer,
    WhatPage,
    PageButton
} from '../searchElement/SearchElements';
import AudioContainer from './AudioContainer';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import { splitAudios } from '../searchElement/searchFunctions';

const MyAudio = () => {
    // Array where found audios are saved
    const [audiot, setAudiot] = useState([[]]);
    // This state keeps track did search succeed or not
    const [error, setError] = useState(false);
    // State to toggle searching or no
    const [searching, setSearching] = useState(false);
    // Audio selected for editing
    const [selectedAudio, setSelectedAudio] = useState(null);

    const [isOpen, setIsOpen] = useState(false);
    // username
    const [username, setUsername] = useState(localStorage.getItem("user"));
    // audio file fetched for listening
    const [audioFetched, setAudioFetched] = useState("");
    //Keep track what page we are showing
    const [pageNum, setPageNum] = useState(0);
    // count of audios
    const [audioCount, setAudioCount] = useState(0);

    // fields for editing audio info
    const [language, setLanguage] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [genre, setGenre] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const languageChanged = (e) => {
        setLanguage(e);
    }

    const titleChanged = (e) => {
        setTitle(e.target.value);
    }

    const descChanged = (e) => {
        setDesc(e.target.value);
    }

    const genreChanged = (e) => {
        setGenre(e);
    }

    const difficultyChanged = (e) => {
        setDifficulty(e);
    }

    const changePage = (param) => {
        if (param === "+") {
            if (pageNum < audiot.length - 1) {
                setPageNum(pageNum + 1);
            }
        } else {
            if (pageNum > 0) {
                setPageNum(pageNum - 1);
            }
        }
    }

    // fetch user's audios from db
    const fetchAudio = async () => {
        setSearching(true);
        const url = "http://127.0.0.1:3001/audio?username=" + username;
        try {
            const response = await fetch(url);
            let rJson = await response.json();

            if (rJson.status === "OK") {
                setError(false);
                setAudioCount(rJson.found.length);
                setAudiot(splitAudios(rJson.found));
                setSearching(false);
            }
            else {
                setError(true);
                setAudiot([[]]);
                setSearching(false);
            }
        } catch {
            console.log("Audio search failed");
            setSearching(false);
        }
    };

    // delete audio
    const deleteAudio = (id) => {
        let dialogProps = {
            title: "Confirm delete",
            message: "Delete recording?",
            clickOk: async () => {
                const requestOptions = {
                    method: 'DELETE',
                };
                const url = "http://127.0.0.1:3001/audio/" + id;
                const response = await fetch(url, requestOptions);
                let result = await response.json();
                if (result.status === "OK") {
                    fetchAudio();
                    setSelectedAudio(null);
                }
            }
        }
        ConfirmDialog(dialogProps);
    };

    // update audio info
    const updateAudio = async (audio) => {
        setSearching(true);
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(audio)
        };
        const url = "http://127.0.0.1:3001/audio/";
        const response = await fetch(url, requestOptions);
        let result = await response.json();
        if (result.status === "OK") {
            fetchAudio();
            setSelectedAudio(null);
        }else{
            setSearching(false);
        }
    };

    // fetch one audio file
    const haeAudioFile = async () => {
        if (selectedAudio) {
            const url = "http://127.0.0.1:3001/audio?file=true&id=" + selectedAudio._id;
            try {
                const response = await fetch(url).then(r => r.blob());
                setAudioFetched(URL.createObjectURL(response));
            } catch {
                console.log("errors")
            }
        }
    }

    // user saves audio info
    const clickSave = (e) => {
        //setSearching(true);
        e.preventDefault();
        if (selectedAudio) {
            let updatedAudio = {
                "_id": selectedAudio._id,
                "language": language.value,
                "title": title,
                "desc": desc,
                "genre": genre.value,
                "difficulty": difficulty.value
            }
            updateAudio(updatedAudio);
            setIsOpen(false);
        }
    };

    // user cancels edit
    const clickCancel = (e) => {
        e.preventDefault();
        setSelectedAudio(null);
        setIsOpen(false);
    };

    // first time loading page
    useEffect(() => {
        fetchAudio();
    }, []);

    // update edit fields according to selected audio
    useEffect(() => {
        if (selectedAudio) {
            setLanguage(languageOptions.find(x => x.value === selectedAudio.language));
            setTitle(selectedAudio.title);
            setDesc(selectedAudio.desc);
            setGenre(genreOptions.find(x => x.value === selectedAudio.genre));
            setDifficulty(difficultyOptions.find(x => x.value === selectedAudio.difficulty));
            haeAudioFile();
        }
    }, [selectedAudio]);

    // map found audios to screen
    const audioInside = audiot[pageNum].map((t, index) => {
        return <AudioContainer
            key={index}
            image={audioimage}
            id={t._id}
            language={t.language}
            title={t.title}
            desc={t.desc}
            genre={t.genre}
            difficulty={t.difficulty}
            deleteAudio={deleteAudio}
            setSelectedAudio={setSelectedAudio}
            setIsOpen={setIsOpen}
        />
    });

    return (
        <MyAudioContainer>
            <SearchContainer isOpen={isOpen}>
                {
                    audioCount > 0 ?
                        <FoundCount>You have {audioCount} recordings</FoundCount> : null
                }
                {
                    audiot[1] ?
                        <PagesContainer>
                            <PageButton onClick={() => { changePage("-") }}> {"<"}Previous</PageButton>
                            <WhatPage>Page: {pageNum + 1}/{audiot.length}</WhatPage>
                            <PageButton onClick={() => { changePage("+") }}>Next{">"}</PageButton>
                        </PagesContainer> : null
                }
                {
                    searching ?
                        <LoaderContainer>
                            <LoaderText>Loading</LoaderText>
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={50}
                                width={50}
                            /></LoaderContainer>


                        : error ?
                            <AudioContainer
                                image={notFound}
                                title="No matches"
                                description="We didn't find anything" />
                            : audioInside
                }
            </SearchContainer>
            <EditContainer isOpen={isOpen}>
                <MyAudioForm >
                    <Title>Edit audio information</Title>
                    {
                        audioFetched !== "" ?
                            <AudioPlayer controls>
                                <source src={audioFetched} type="audio/webm" />
                            </AudioPlayer> : null

                    }
                    <FormLabel htmlFor="for" >Language</FormLabel>
                    <SelectContainer>
                        <Select
                            value={language}
                            onChange={languageChanged}
                            options={languageOptions}
                        />
                    </SelectContainer>

                    <FormLabel htmlFor="for" >Title</FormLabel>
                    <FormInput type="text" value={title} onChange={(e) => titleChanged(e)} defa></FormInput>

                    <FormLabel htmlFor="for" >Description</FormLabel>
                    <FormDesc type="textarea" value={desc} onChange={(e) => descChanged(e)}></FormDesc>

                    <FormLabel htmlFor="for" >Genre</FormLabel>
                    <SelectContainer>
                        <Select
                            value={genre}
                            onChange={genreChanged}
                            options={genreOptions}
                        />
                    </SelectContainer>

                    <FormLabel htmlFor="for" >Difficulty</FormLabel>
                    <SelectContainer>
                        <Select
                            value={difficulty}
                            onChange={difficultyChanged}
                            options={difficultyOptions}
                        />
                    </SelectContainer>
                    <EditButtonContainer>
                        <EditButton onClick={(e) => clickSave(e)}>Save</EditButton>
                        <EditButton onClick={(e) => clickCancel(e)}>Cancel</EditButton>
                    </EditButtonContainer>
                </MyAudioForm>
            </EditContainer>
        </MyAudioContainer>
    )
}

export default MyAudio;