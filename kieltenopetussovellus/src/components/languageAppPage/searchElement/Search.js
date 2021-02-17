import React, { useState, useEffect } from 'react';
import Select from 'react-select';
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
    FormButton
} from './SearchElements';
import AudioContainer from './AudioContainer';
import audioimage from '../../../images/AudioWave.jpg';


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];



const Search = () => {

    const [isOpen, setIsopen] = useState(false);
    const [doFetch, setDoFetch] = useState(0);
    const [audiot, setAudiot] = useState([]);

    //Select component
    const [selectedOption, setSelectedOption] = useState(null);
    //radio button
    const [selectedBtn, setSelectedBtn] = useState(null);
    //audio search input
    const [audio, setAudio] = useState("");

    const toggle = () => {
        setIsopen(!isOpen);
    }

    const handleSelectClick = (param) => {
        setSelectedOption(param)
    }
    const radioButtonChanged = (value) => {
        setSelectedBtn(value);
    }

    const audioChanged = (e) => {
        setAudio(e.target.value);
    }

    const fetchAudio = (e) => {
        setDoFetch(doFetch + 1);
        e.preventDefault();
    }

    useEffect(() => {
        const haeAudio = async () => {

            try {
                const response = await fetch("http://127.0.0.1:3001/audio" + "?title=title").then(r => r.blob());
                console.log(response);

                let t = audiot
                t.splice(0, t.length)
                t.push(URL.createObjectURL(response));
                setAudiot(t);
            } catch {
                console.log("errors")
            }


        }
        if (doFetch > 0) {
            haeAudio();
        }
    }, [doFetch])

    const audioInside = audiot.map((t, index) => {
        return <AudioContainer
            key={index}
            image={audioimage}
            title="testi {index}"
            description="Tässä vähän pitempi teksti kuvaukseen"
            audio={t} />
    });
    return (
        <SearchAndListenContainer data-testid="searchContainer">
            <OpenSearchIconContainer  isOpen={isOpen} onClick={toggle}>
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
                    <FormInput type="text" value={audio} onChange={(e) => { audioChanged(e) }} />
                    <FormLabel htmlFor="for" >Genre</FormLabel>
                    <SelectContainer>
                        <Select
                            value={selectedOption}
                            onChange={handleSelectClick}
                            options={options}
                        />
                    </SelectContainer>
                    <FormLabel htmlFor="for" >Difficulty</FormLabel>
                    <RadioBtnContainer>
                        <RadioGroup onChange={(value) => { radioButtonChanged(value) }}>
                            <ReversedRadioButton rootColor="#FFC67C" pointColor="#68EDCB" value="beginner">Beginner</ReversedRadioButton>
                            <ReversedRadioButton rootColor="#FFC67C" pointColor="#68EDCB" value="intermediate">Intermediate</ReversedRadioButton>
                            <ReversedRadioButton rootColor="#FFC67C" pointColor="#68EDCB" value="expert">Expert</ReversedRadioButton>
                        </RadioGroup>
                    </RadioBtnContainer>
                    <FormButton type="submit">Search</FormButton>
                </Form>
            </SearchContainer>
            <ListenContainer>
                {audioInside}  
            </ListenContainer>
        </SearchAndListenContainer>
    )
}

export default Search;