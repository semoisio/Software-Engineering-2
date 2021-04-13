import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Loader from "react-loader-spinner";
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import { OBbg, OBhover } from '../../../tools/colors';
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
    RadioBtnContainer,
    FormButton,
    LoaderContainer,
    LoaderText,
    FoundCount,
    ClearButton,
    PagesContainer,
    WhatPage,
    Found,
    PageButton
} from './SearchElements';
import {
    buildQuery,
    splitAudios
} from './searchFunctions';
import AudioContainer from './AudioContainer';
import audioimage from '../../../images/AudioWave.jpg';
import notFound from '../../../images/notFound.png';
import { genreOptions, languageOptions } from '../../../tools/defaultOptions';
import Listen from './Listen';

const Search = () => {
    //This keep track is search open or not in smaller window sizes
    const [isOpen, setIsopen] = useState(false);

    //Keep track what page we are showing
    const [pageNum, setPageNum] = useState(0);
    //If you want to do search update this state by +1
    const [doFetch, setDoFetch] = useState(0);

    //Array where finded audios are saved
    const [audiot, setAudiot] = useState([[]]);
    // This state keeps track did search succeed or not
    const [error, setError] = useState(false);
    // State to toggle searching or no
    const [searching, setSearching] = useState(false);

    //Select component genre
    const [selectedGenre, setSelectedGenre] = useState({ value: "" });
    //Select component language
    const [selectedLanguage, setSelectedLanguage] = useState({ value: "" });

    //radio button
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    //Difficulty checked holds information what radiobutten have to bee checked
    const [difficultyChecked, setDifficultyChecked] = useState([false, false, false]);

    //audio search input
    const [audioTitle, setAudioTitle] = useState("");

    // open listening view
    const [listening, setListening] = useState(false);

    // audio that is selected for listening
    const [selectedAudio, setSelectedAudio] = useState(null);

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
    const radioButtonChanged = (value) => {
        setSelectedDifficulty(value);
        switch (value) {
            case "beginner":
                setDifficultyChecked([true, false, false])
                break;
            case "intermediate":
                setDifficultyChecked([false, true, false])
                break;
            case "expert":
                setDifficultyChecked([false, false, true])
                break;
            default:
                setDifficultyChecked([false, false, false])
                break;
        }
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
            const uncheckedQuery = [audioTitle, selectedDifficulty, selectedGenre.value, selectedLanguage.value];

            let query = buildQuery(uncheckedQuery, queryKeys);
            const url = "http://127.0.0.1:3001/audio" + query
            try {
                const response = await fetch(url);
                let rJson = await response.json();

                if (rJson.status === "OK") {
                    setError(false);
                    setAudiot(splitAudios(rJson.found));
                    setSearching(false);
                }
                else {
                    setError(true);
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

    // When page opened first time this function fetches some audio to display to screen
    useEffect(() => {
        const fetchAudio = async () => {
            setSearching(true);
            const url = "http://127.0.0.1:3001/audio";
            try {
                const response = await fetch(url);
                let rJson = await response.json();

                if (rJson.status === "OK") {
                    setError(false);
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

        }

        fetchAudio();

    }, []);

    /**
     * Clears all text and choices from form
     */
    const clearChoices = () => {
        setSelectedGenre({ value: "" });
        setSelectedLanguage({ value: "" });
        setAudioTitle("")
        radioButtonChanged("");
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
                            <RadioBtnContainer>
                                <RadioGroup onChange={(value) => { radioButtonChanged(value) }}>
                                    <RadioButton checked={difficultyChecked[0]} rootColor={OBbg} pointColor={OBhover} value="beginner">Beginner</RadioButton>
                                    <RadioButton checked={difficultyChecked[1]} rootColor={OBbg} pointColor={OBhover} value="intermediate">Intermediate</RadioButton>
                                    <RadioButton checked={difficultyChecked[2]} rootColor={OBbg} pointColor={OBhover} value="expert">Expert</RadioButton>
                                </RadioGroup>
                            </RadioBtnContainer>
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
                                    audiot.length !== 0 ?
                                        <FoundCount>
                                            <Found>Found: {calculateAudios()}</Found>
                                            <PageButton onClick={() => { changePage("-") }}>{"<"}Previous</PageButton>
                                            <PageButton onClick={() => { changePage("+") }}>Next{">"}</PageButton>
                                            <WhatPage>Page: {pageNum + 1}/{audiot.length}</WhatPage>
                                        </FoundCount> : null
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
                                    <PagesContainer>
                                        <PageButton onClick={() => { changePage("-") }}> {"<"}Previous</PageButton>
                                        <WhatPage>Page: {pageNum + 1}/{audiot.length}</WhatPage>
                                        <PageButton onClick={() => { changePage("+") }}>Next{">"}</PageButton>
                                    </PagesContainer>
                        }

                    </SearchResultContainer>
                </SearchAndListenContainer>
            }
        </>
    )
}
export default Search;