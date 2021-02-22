import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Loader from "react-loader-spinner";
import { RadioGroup, RadioButton, ReversedRadioButton } from 'react-radio-buttons';
import {
    SearchAndListenContainer,
    SearchContainer,
    ListenContainer,
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
    LoaderText
} from './SearchElements';
import {
    buildQuery
} from './searchFunctions';
import AudioContainer from './AudioContainer';
import audioimage from '../../../images/AudioWave.jpg';
import notFound from '../../../images/notFound.png';


const options = [
    { value: 'none', label: 'None' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];



const Search = () => {
    const [isOpen, setIsopen] = useState(false);
    const [doFetch, setDoFetch] = useState(0);
    const [audiot, setAudiot] = useState([]);
    const [error, setError] = useState(false);
    const [searching, setSearching] = useState(false);

    //Select component
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedGenreString, setSelectedGenreString] = useState("");
    //radio button
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    //audio search input
    const [audioTitle, setAudioTitle] = useState("");

    const toggle = () => {
        setIsopen(!isOpen);
    }

    const handleSelectClick = (param) => {
        setSelectedGenre(param);
        setSelectedGenreString(param.value);
    }
    const radioButtonChanged = (value) => {
        setSelectedDifficulty(value);
    }

    const audioChanged = (e) => {
        setAudioTitle(e.target.value);
    }

    const fetchAudio = (e) => {
        setDoFetch(doFetch + 1);
        toggle();
        e.preventDefault();
    }


    useEffect(() => {
        const haeAudio = async () => {
            setSearching(true);
            const queryKeys = ["title", "difficulty", "genre"];
            const uncheckedQuery = [audioTitle, selectedDifficulty, selectedGenreString];

            let query = buildQuery(uncheckedQuery, queryKeys);
            const url = "http://127.0.0.1:3001/audio" + query
            try {
                const response = await fetch(url);
                let rJson = await response.json();

                if (rJson.status === "OK") {
                    setError(false);
                    setAudiot(rJson.found);
                    setSearching(false);
                }
                else {
                    setError(true);
                    setAudiot([]);
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

    useEffect(() => {
        const fetchAudio = async () => {
            setSearching(true);
            const url = "http://127.0.0.1:3001/audio"
            try {
                const response = await fetch(url);
                let rJson = await response.json();

                if (rJson.status === "OK") {
                    setError(false);
                    setAudiot(rJson.found);
                    setSearching(false);
                }
                else {
                    setError(true);
                    setAudiot([]);
                    setSearching(false);
                }
            } catch {
                console.log("Audio search failed");
                setSearching(true);
            }

        }

        fetchAudio();

    }, []);

    const audioInside = audiot.map((t, index) => {
        return <AudioContainer
            key={index}
            image={audioimage}
            title={t.title}
            description={t.desc}
            id={t._id}
        />
    });
    return (
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
                    <FormLabel htmlFor="for" >Genre</FormLabel>
                    <SelectContainer>
                        <Select
                            value={selectedGenre}
                            onChange={handleSelectClick}
                            options={options}
                        />
                    </SelectContainer>
                    <FormLabel htmlFor="for" >Difficulty</FormLabel>
                    <RadioBtnContainer>
                        <RadioGroup onChange={(value) => { radioButtonChanged(value) }}>
                            <RadioButton rootColor="#FFC67C" pointColor="#68EDCB" value="beginner">Beginner</RadioButton>
                            <RadioButton rootColor="#FFC67C" pointColor="#68EDCB" value="intermediate">Intermediate</RadioButton>
                            <RadioButton rootColor="#FFC67C" pointColor="#68EDCB" value="expert">Expert</RadioButton>
                        </RadioGroup>
                    </RadioBtnContainer>
                    <FormButton type="submit">Search</FormButton>
                </Form>
            </SearchContainer>
            <ListenContainer>
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
            </ListenContainer>
        </SearchAndListenContainer>
    )
}

export default Search;