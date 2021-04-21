import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import FooterJS from '../../footer/Footer';
import Loader from "react-loader-spinner";
import {
    SearchAndListenContainer,
    SearchContainer,
    SearchResultContainer,
    OpenSearchIconContainer,
    SearchText,
    OpenIcon,
    CloseSearchIconContainer,
    CloseIcon,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    SelectContainer,
    FormButton,
    LoaderContainer,
    LoaderText,
    FoundCount,
    ClearButton,
    PagesContainer,
    WhatPage,
    Found,
    PageButton,
    SortContainer,
    SortInput,
} from './SearchElements';
import {
    buildQuery,
    splitAudios
} from './searchFunctions';
import AudioContainer from './AudioContainer';
import audioimage from '../../../images/AudioWave.jpg';
import notFound from '../../../images/notFound.png';
import { genreOptions, languageOptions, sortOptions, difficultyOptions } from '../../../tools/defaultOptions';
import Listen from './Listen';
import { sortByKey } from '../../../tools/sortFunctions';

const Search = () => {
    //This keep track is search open or not in smaller window sizes
    const [isOpen, setIsopen] = useState(false);

    //Keep track what page we are showing
    const [pageNum, setPageNum] = useState(0);
    //If you want to do search update this state by +1
    const [doFetch, setDoFetch] = useState(0);

    //Array where finded audios are saved by page
    const [audiot, setAudiot] = useState([[]]);
    // array where found audios from server are saved
    const [audioArray, setAudioArray] = useState([]);

    // This state keeps track did search succeed or not
    const [error, setError] = useState(false);
    // State to toggle searching or no
    const [searching, setSearching] = useState(false);

    //Select component genre
    const [selectedGenre, setSelectedGenre] = useState({ value: "" });
    //Select component language
    const [selectedLanguage, setSelectedLanguage] = useState({ value: "" });

    //Select component difficulty
    const [selectedDifficulty, setSelectedDifficulty] = useState({ value: "" });


    //audio search input
    const [audioTitle, setAudioTitle] = useState("");

    // open listening view
    const [listening, setListening] = useState(false);

    // audio that is selected for listening
    const [selectedAudio, setSelectedAudio] = useState(null);

    // sort audio
    const [sortAudio, setSortAudio] = useState(sortOptions[0]);
    const [sortCount, setSortCount] = useState(0);

    // Toggle search open and close
    const toggle = () => {
        setIsopen(!isOpen);
    }

    // All changed functions keep track what have been written in form
    const handleSelectClickLanguage = (param) => {
        setSelectedLanguage(param);
    }
    const handleSelectClickGenre = (param) => {
        setSelectedGenre(param);
    }
    const handleSelectClickDifficulty = (param) => {
        setSelectedDifficulty(param);
      }

    const audioChanged = (e) => {
        setAudioTitle(e.target.value);
    }

    const listeningChanged = (listening) => {
        setListening(listening);
    }

    // Set selectedaudio by id
    const selectedAudioChanged = (audioId) => {
        setSelectedAudio(audioId);
    }

    const sortChanged = (e) => {
        setSortAudio(e);
        setSortCount(1);
    }

    // Form submit button fires this function and this fires audiofetch from database
    const fetchAudio = (e) => {
        setDoFetch(doFetch + 1);
        toggle();
        e.preventDefault();
    }

    // This fetches audios from database with according search terms
    useEffect(() => {
        const haeAudio = async () => {
            setPageNum(0);
            setSearching(true);
            const queryKeys = ["title", "difficulty", "genre", "language"];
            const uncheckedQuery = [audioTitle, selectedDifficulty.value, selectedGenre.value, selectedLanguage.value];

            let query = buildQuery(uncheckedQuery, queryKeys);
            const url = "http://127.0.0.1:3001/audio" + query
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
                    setAudiot(splitAudios(sorted));
                    setSearching(false);
                }
                else {
                    setError(true);
                    setAudioArray([]);
                    setAudiot([[]]);
                    setSearching(false);
                }
            } catch {
                console.log("Audio search failed")
                setSearching(false);
            }

        }
        if (doFetch > 0) {
            haeAudio();
        }
    }, [doFetch]);

    //When page opened first time this function fetches some audio to display to screen
    // useEffect(() => {
    //     const fetchAudio = async () => {
    //         setSearching(true);
    //         const url = "http://127.0.0.1:3001/audio";
    //         try {
    //             const response = await fetch(url);
    //             let rJson = await response.json();

     useEffect(() => {
        const fetchAudio = async () => {
            setSearching(true);
            const userURL = "http://127.0.0.1:3001/user?username=" + localStorage.getItem("user");

            try {
                const user = await fetch(userURL);
                let userJson = await user.json();

                const url = "http://127.0.0.1:3001/audio?language="+ userJson.found.learning;
                const response = await fetch(url);
                let rJson = await response.json();   

                if (rJson.status === "OK") {
                    setError(false);
                    let sorted = sortByKey(rJson.found, sortAudio.value);
                    sorted = sorted.reverse();
                    setAudioArray(sorted);
                    setAudiot(splitAudios(sorted));
                    setSearching(false);
                }
                else {
                    setError(true);
                    setAudioArray([]);
                    setAudiot([[]]);
                    setSearching(false);
                }
            } catch {
                console.log("Audio search failed");
                setSearching(false);
            }

        }

        fetchAudio();

    }, []);

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

    /**
     * Clears all text and choices from form
     */
    const clearChoices = () => {
        setSelectedGenre({ value: "" });
        setSelectedLanguage({ value: "" });
        setAudioTitle("")
        setSelectedDifficulty({value: ""});
    };

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

    const calculateAudios = () => {
        let i = 0;
        audiot.forEach(element => {
            element.forEach(element => {
                i++;
            });
        });
        return i;
    }

    /**
     * Maps all audios to screen
     */
    const audioInside = audiot[pageNum].map((t, index) => {
        return <AudioContainer
            key={index + "," + pageNum}
            avain={index}
            image={t.language}
            title={t.title}
            description={t.desc}
            id={t._id}
            setListening={listeningChanged}
            setSelectedAudio={selectedAudioChanged}
        />
    });

    return (
        <>
            { listening ? <Listen
                setListening={listeningChanged}
                id={selectedAudio}
            /> :
                <div>
                <SearchAndListenContainer data-testid="searchContainer">
                    <OpenSearchIconContainer isOpen={isOpen} onClick={toggle}>
                        <SearchText>Open search</SearchText>
                        <OpenIcon onClick={toggle} />
                    </OpenSearchIconContainer>
                    <SearchContainer isOpen={isOpen}>
                        <CloseSearchIconContainer isOpen={isOpen} onClick={toggle}>
                            <SearchText>Close search</SearchText>
                            <CloseIcon onClick={toggle} />
                        </CloseSearchIconContainer>
                        <Form onSubmit={(e) => fetchAudio(e)}>
                            <FormH1>Search audio</FormH1>
                            <FormLabel htmlFor="for" >Search</FormLabel>
                            <FormInput type="text" value={audioTitle} onChange={(e) => { audioChanged(e) }} />
                            <FormLabel htmlFor="for" >Language</FormLabel>
                            <SelectContainer>
                                <Select
                                    value={selectedLanguage}
                                    onChange={handleSelectClickLanguage}
                                    options={languageOptions}
                                />
                            </SelectContainer>
                            <FormLabel htmlFor="for" >Genre</FormLabel>
                            <SelectContainer>
                                <Select
                                    value={selectedGenre}
                                    onChange={handleSelectClickGenre}
                                    options={genreOptions}
                                />
                            </SelectContainer>
                            <FormLabel htmlFor="for" >Difficulty</FormLabel>
                            <SelectContainer>
                                <Select
                                    value={selectedDifficulty}
                                    onChange={handleSelectClickDifficulty}
                                    options={difficultyOptions}
                                />
                            </SelectContainer>
                            <ClearButton type="button" onClick={() => { clearChoices() }}>Clear</ClearButton>
                            <FormButton type="submit">Search</FormButton>
                        </Form>
                    </SearchContainer>
                    <SearchResultContainer>
                        {  // if audios found show lenght of array
                            searching ?
                                null :
                                error ?
                                    null :
                                    audiot.length === 0 ? null :
                                        audiot[1] ?
                                            <div>
                                                <FoundCount><FormH1>
                                                Found: {calculateAudios()} recordings
                                                </FormH1></FoundCount>
                                                
                                                <SortContainer>
                                                <PageButton onClick={() => { changePage("-") }}>{"<"}Previous</PageButton>
                                                    <FormLabel htmlFor="for">Sort by</FormLabel>
                                                    <SortInput
                                                        value={sortAudio}
                                                        onChange={sortChanged}
                                                        options={sortOptions}
                                                    />
                                                <PageButton onClick={() => { changePage("+") }}>Next{">"}</PageButton>
                                                </SortContainer>
                                                
                                                
                                                
                                             
                                            </div>:
                                            <div>
                                            <FoundCount>
                                                <FormH1>Found: {calculateAudios()} recordings</FormH1>
                                                </FoundCount>
                                                <SortContainer>
                                                    <FormLabel htmlFor="for">Sort by</FormLabel>
                                                    <SortInput
                                                        value={sortAudio}
                                                        onChange={sortChanged}
                                                        options={sortOptions}
                                                    />
                                                </SortContainer>
                                            
                                            </div>
                        }
                        { // if search is happening show loader
                            searching ?
                                <LoaderContainer>
                                    <LoaderText>Loading</LoaderText>
                                    <Loader
                                        type="TailSpin"
                                        color="#00BFFF"
                                        height={50}
                                        width={50}
                                    />
                                </LoaderContainer>
                                : error ?  // if search did not find enything show error else audios
                                    <AudioContainer
                                        image={notFound}
                                        title="No matches"
                                        description="We didn't find anything" />
                                    : audioInside
                        }
                        {
                            searching ?
                                null :
                                error ?
                                    null :
                                    audiot[1] ?
                                        <PagesContainer>
                                            <PageButton onClick={() => { changePage("-") }}> {"<"}Previous</PageButton>
                                            <WhatPage>Page: {pageNum + 1}/{audiot.length}</WhatPage>
                                            <PageButton onClick={() => { changePage("+") }}>Next{">"}</PageButton>
                                        </PagesContainer> : null
                        }
                    
                    </SearchResultContainer>
    
                </SearchAndListenContainer>
                <FooterJS/>
                </div>
            }
        </>
    )
}
export default Search;