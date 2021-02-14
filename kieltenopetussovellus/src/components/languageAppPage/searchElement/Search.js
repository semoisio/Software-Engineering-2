import React, { useState } from 'react';
import Select from 'react-select';
import { RadioGroup, RadioButton,ReversedRadioButton  } from 'react-radio-buttons';
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

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];



const Search = () => {

    const [isOpen, setIsopen] = useState(false);

    //Select component
    const [selectedOption, setSelectedOption] = useState(null);
    //radio button
    const [selectedBtn, setSelectedBtn ] = useState(null);
    //audio search input
    const [audio, setAudio] = useState("");
 
    const toggle = () => {
        setIsopen(!isOpen);
    }

    const handleSelectClick = (param) => {
        setSelectedOption(param)
    }
    const radioButtonChanged = (value) =>{
        setSelectedBtn(value);
    }

    const audioChanged = (e) => {
        setAudio(e.target.value);
    } 

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
                <Form>
                    <FormH1>Search audio</FormH1>
                    <FormLabel htmlFor="for" >Search</FormLabel>
                    <FormInput type="text" value={audio} onChange={(e) =>{audioChanged(e)} } />
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
                        <RadioGroup  onChange={(value) => {radioButtonChanged(value)}}>
                            <RadioButton rootColor="#FFC67C" pointColor="#68EDCB" value="beginner">Beginner</RadioButton>
                            <RadioButton rootColor="#FFC67C" pointColor="#68EDCB" value="intermediate">Intermediate</RadioButton>
                            <RadioButton rootColor="#FFC67C" pointColor="#68EDCB" value="expert">Expert</RadioButton> 
                        </RadioGroup>
                    </RadioBtnContainer>
                    <FormButton>Search</FormButton>
                </Form>
            </SearchContainer>
            <ListenContainer>

            </ListenContainer>
        </SearchAndListenContainer>
    )
}

export default Search
