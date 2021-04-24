import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import Loader from "react-loader-spinner";
import audioimage from '../../../images/AudioWave.jpg';
import notFound from '../../../images/notFound.png';
import { genreOptions, languageOptions, difficultyOptions, sortOptions } from '../../../tools/defaultOptions';
import FooterJS from '../../footer/Footer';
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
    LoaderContainer,
    LoaderText,
    EditButton,
    EditButtonContainer,
    AudioPlayer,
    SortContainer,
    SelectInput,
    SearchButton,
    SearchInput,
    QuizContainer,
    QuizCheck,
    QuestionAnswer,
    FooterDiv
} from './MyAudioElements';
import {
    PagesContainer,
    WhatPage,
    PageButton
} from '../searchElement/SearchElements';
import AudioContainer from './AudioContainer';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import { splitAudios } from '../searchElement/searchFunctions';
import { sortByKey } from '../../../tools/sortFunctions';
import NotifyDialog from '../../../dialogs/NotifyDialog';

const MyAudio = () => {
    // Array where found audios are saved by page
    const [audiot, setAudiot] = useState([[]]);
    // array where found audios from server are saved
    const [audioArray, setAudioArray] = useState([]);
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
    // sort audios by this
    const [sortAudio, setSortAudio] = useState(sortOptions[0]);
    const [sortCount, setSortCount] = useState(0);
    //audio search input
    const [searchTitle, setSearchTitle] = useState("");
    const [searchInputChanged, setSearchInputChanged] = useState(false);

    // fields for editing audio info
    const [language, setLanguage] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [genre, setGenre] = useState("");
    const [difficulty, setDifficulty] = useState("");

    // quiz inputs
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [a1, setA1] = useState("");
    const [a2, setA2] = useState("");
    const [a3, setA3] = useState("");

    const sortChanged = (e) => {
        setSortAudio(e);
        setSortCount(1);
    }

    const languageChanged = (e) => {
        setLanguage(e);
    }

    const titleChanged = (e) => {
        let title = e.target.value;
        if (title.length <= 50) {
            setTitle(title);
        }
    }

    const descChanged = (e) => {
        let desc = e.target.value;
        if (desc.length <= 300) {
            setDesc(desc);
        }
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

    const searchTitleChanged = (e) => {
        setSearchTitle(e.target.value);
        setSearchInputChanged(true);
    }

    const clickSearch = () => {
        if (searchInputChanged) {
            fetchAudio();
        }
    }

    const length = 100;
    const q1Changed = (e) => {
        if (e.target.value.length < length) {
            setQ1(e.target.value);
        }
    }
    const q2Changed = (e) => {
        if (e.target.value.length < length) {
            setQ2(e.target.value);
        }
    }
    const q3Changed = (e) => {
        if (e.target.value.length < length) {
            setQ3(e.target.value);
        }
    }
    const a1Changed = (e) => {
        if (e.target.value.length < length) {
            setA1(e.target.value);
        }
    }
    const a2Changed = (e) => {
        if (e.target.value.length < length) {
            setA2(e.target.value);
        }
    }
    const a3Changed = (e) => {
        if (e.target.value.length < length) {
            setA3(e.target.value);
        }
    }

    const clearQuiz = () => {
        setQ1("");
        setQ2("");
        setQ3("");
        setA1("");
        setA2("");
        setA3("");
    }

    const validateQuiz = () => {
        let message = "";
        if (q1.length > 0 && a1.length === 0 || q2.length > 0 && a2.length === 0 || q3.length > 0 && a3.length === 0) {
            message = "Give answer to each question.";
        }
        else if (q1.length === 0 && a1.length > 0 || q2.length === 0 && a2.length > 0 || q3.length === 0 && a3.length > 0) {
            message = "Dont use empty questions.";
        }
        return message;
    }

    const clickClear = (e) => {
        e.preventDefault();
        clearQuiz();
    }

    // fetch user's audios from db
    const fetchAudio = async () => {
        setSearchInputChanged(false);
        setSearching(true);
        let url = "http://127.0.0.1:3001/audio?username=" + username;
        if (searchTitle !== "") {
            url += "&title=" + searchTitle;
        }
        try {
            const response = await fetch(url);
            let rJson = await response.json();

            if (rJson.status === "OK") {
                setError(false);
                let sorted = sortByKey(rJson.found, sortAudio.value);
                if (sortAudio.value === "added") {
                    sorted = sorted.reverse();
                }
                setAudioArray(sorted);
                setAudioCount(rJson.found.length);
                setAudiot(splitAudios(sorted));
                setSearching(false);
            }
            else {
                setAudioCount(0);
                setError(true);
                setAudioArray([]);
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
                    clearQuiz();
                }
                else {
                    dialogProps = {
                        title: "Error",
                        message: result.msg
                    }
                    NotifyDialog(dialogProps);
                }
            }
        }
        ConfirmDialog(dialogProps);
    };

    // update audio info
    const updateAudio = async (audio) => {
        setSearching(true);
        let dialogprops = null;
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
            dialogprops = {
                title: "Success",
                message: "Audio updated successfully.",
            }
        } else {
            setSearching(false);
            dialogprops = {
                title: "Error",
                message: result.msg + ".",
            }
        }
        NotifyDialog(dialogprops);
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
        e.preventDefault();
        if (selectedAudio) {
            let updatedAudio = null;
            let dialogProps = null;
            // check that fields are given
            if (language && title.length > 0 && desc.length > 0 && genre && difficulty) {
                let quiz = [];
                let message = validateQuiz();
                if (message !== "") {
                    dialogProps = {
                        title: "Check quiz",
                        message: message,
                    }
                }
                else {
                    if (q1.length > 0) {
                        quiz.push({ question: q1, answer: a1 });
                    }
                    if (q2.length > 0) {
                        quiz.push({ question: q2, answer: a2 });
                    }
                    if (q3.length > 0) {
                        quiz.push({ question: q3, answer: a3 });
                    }
                    updatedAudio = {
                        "_id": selectedAudio._id,
                        "language": language.value,
                        "title": title,
                        "desc": desc,
                        "genre": genre.value,
                        "difficulty": difficulty.value,
                        "quiz": quiz
                    };
                    updateAudio(updatedAudio);
                    setIsOpen(false);
                }
            }
            // some field missing
            else {
                dialogProps = {
                    title: "Missing information",
                    message: "Please fill audio information.",
                }
            }
            if (dialogProps !== null) {
                NotifyDialog(dialogProps);
            }
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
            if (selectedAudio.quiz && selectedAudio.quiz.length > 0) {
                let quiz = selectedAudio.quiz;
                let i;
                for (i = 0; i < quiz.length; i++) {
                    if (i === 0) {
                        setQ1(quiz[i].question);
                        setA1(quiz[i].answer);
                    }
                    else if (i === 1) {
                        setQ2(quiz[i].question);
                        setA2(quiz[i].answer);
                    }
                    else {
                        setQ3(quiz[i].question);
                        setA3(quiz[i].answer);
                    }
                }
            }
            else {
                clearQuiz();
            }
            haeAudioFile();
        }
    }, [selectedAudio]);

    // sorting parameter changed
    useEffect(() => {
        if (audioArray.length > 0 && sortCount > 0) {
            let sorted = sortByKey(audioArray, sortAudio.value);
            if (sortAudio.value === "added") {
                sorted = sorted.reverse();
            }
            setAudioArray(sorted);
            setAudiot(splitAudios(sorted));
        }
    }, [sortAudio]);

    // map found audios to screen
    const audioInside = audiot[pageNum].map((t, index) => {
        return <AudioContainer
            key={index}
            id={t._id}
            language={t.language}
            title={t.title}
            desc={t.desc}
            genre={t.genre}
            difficulty={t.difficulty}
            quiz={t.quiz}
            deleteAudio={deleteAudio}
            setSelectedAudio={setSelectedAudio}
            setIsOpen={setIsOpen}
            rating={t.rating}
        />
    });

    return (
        <div>
            <MyAudioContainer>
                {
                    searching ?
                        <LoaderContainer>
                            <LoaderText>Loading</LoaderText>
                            <Loader
                                type="TailSpin"
                                color="#00BFFF"
                                height={50}
                                width={50}
                            /></LoaderContainer> :
                        <SearchContainer isOpen={isOpen}>
                            {
                                audioCount > 0 ?
                                    <Title>You have {audioCount} recordings.</Title> :
                                    <Title>You have no recordings.</Title>
                            }
                            {
                                audioCount > 0 ?
                                    <SortContainer>
                                        <FormLabel htmlFor="for">Sort by</FormLabel>
                                        <SelectInput
                                            value={sortAudio}
                                            onChange={sortChanged}
                                            options={sortOptions}
                                        />
                                        <FormLabel htmlFor="for">Search</FormLabel>
                                        <FormInput maxLength="50" value={searchTitle} onChange={(e) => searchTitleChanged(e)}></FormInput>
                                        <SearchButton onClick={() => clickSearch()}>Search</SearchButton>
                                    </SortContainer> : null
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
                                error ?
                                    <AudioContainer
                                        image={notFound}
                                        title="No matches"
                                        description="We didn't find anything" />
                                    : audioInside
                            }
                        </SearchContainer>
                }
                <EditContainer isOpen={isOpen}>
                    <MyAudioForm >
                        <Title>Edit audio information</Title>
                        {
                            audioFetched !== "" ?
                                <AudioPlayer controls>
                                    <source width="200px" src={audioFetched} type="audio/webm" />
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
                        <QuizContainer>
                            <QuestionAnswer>
                                <FormLabel htmlFor="for" >Question 1</FormLabel>
                                <FormInput type="text" value={q1} onChange={(e) => { q1Changed(e) }}></FormInput>
                                <FormLabel htmlFor="for">Answer</FormLabel>
                                <FormInput type="text" value={a1} onChange={(e) => { a1Changed(e) }}></FormInput>
                            </QuestionAnswer>
                            <QuestionAnswer>
                                <FormLabel htmlFor="for">Question 2</FormLabel>
                                <FormInput type="text" value={q2} onChange={(e) => { q2Changed(e) }}></FormInput>
                                <FormLabel htmlFor="for">Answer</FormLabel>
                                <FormInput type="text" value={a2} onChange={(e) => { a2Changed(e) }}></FormInput>
                            </QuestionAnswer>
                            <QuestionAnswer>
                                <FormLabel htmlFor="for">Question 3</FormLabel>
                                <FormInput type="text" value={q3} onChange={(e) => { q3Changed(e) }}></FormInput>
                                <FormLabel htmlFor="for">Answer</FormLabel>
                                <FormInput type="text" value={a3} onChange={(e) => { a3Changed(e) }}></FormInput>
                            </QuestionAnswer>
                            <EditButton className="button2" onClick={(e) => clickClear(e)}>Clear quiz</EditButton>
                        </QuizContainer>
                        <EditButtonContainer>
                            <EditButton className="button" onClick={(e) => clickSave(e)}>Save</EditButton>
                            <EditButton className="button2" onClick={(e) => clickCancel(e)}>Cancel</EditButton>
                        </EditButtonContainer>
                    </MyAudioForm>
                </EditContainer>
            </MyAudioContainer>
            <FooterJS />
        </div>
    )
}

export default MyAudio;