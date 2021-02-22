import React, { useState, useEffect } from 'react';
import { ReactMic } from 'react-mic';
import Select from 'react-select';
import {
  RecordButton,
  RecordingContainer,
  NewRecordingContainer,
  InfoContainer,
  RecordingButtonContainer,
  RecordingForm,
  FormLabel,
  FormInput,
  FormH1,
  FormButton,
  SelectContainer,
  FormDesc,
  RecordingMic
} from './NewRecordingElements';
const fs = require('fs');


const NewRecording = () => {
  const [recording, setRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [genre, setGenre] = useState("");
  const [difficulty, setDifficulty] = useState("");

  const languageOptions = [
    { value: "en", label: "English" },
    { value: "fi", label: "Finnish" }
  ];

  const difficultyOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "expert", label: "Expert" }
  ];

  const languageChanged = (e) => {
    setLanguage(e);
  }

  const usernameChanged = (e) => {
    setUsername(e.target.value);
  }

  const titleChanged = (e) => {
    setTitle(e.target.value);
  }

  const descChanged = (e) => {
    setDesc(e.target.value);
  }

  const genreChanged = (e) => {
    setGenre(e.target.value);
  }

  const difficultyChanged = (e) => {
    setDifficulty(e);
  }

  const startRecording = () => {
    if (recordedAudio) {
      if (window.confirm("Previous audio will be lost if you start recording. Continue?")) {
        setRecording(true);
      }
    }
    else {
      setRecording(true);
    }
  }

  const stopRecording = () => {
    setRecording(false);
  }

  const onStop = (recordedBlob) => {
    setRecordedAudio(recordedBlob);
  }

  const uploadAudio = async () => {
    // while not recordin
    if (!recording) {

      // check that audio is ready
      if (recordedAudio) {

        // check that fields are given
        if (language && username.length > 0 && title.length > 0 && desc.length > 0 && genre.length > 0 && difficulty) {

          // get blob from url
          let blob = await fetch(recordedAudio.blobURL).then(r => r.blob());

          // create formdata from blob
          var file = new File([blob], "test", { type: "audio/webm" });
          let fd = new FormData();
          fd.append('audio', file);
          fd.append('username', username);
          fd.append('language', language.value);
          fd.append('title', title);
          fd.append('desc', desc);
          fd.append('genre', genre);
          fd.append('difficulty', difficulty.value);

          // send formdata to server
          const requestOptions = {
            method: 'POST',
            body: fd
          };
          const result = await fetch("http://127.0.0.1:3001/audio", requestOptions);
          let response = await result.json();

          if (response.status === "OK") {
            window.alert("Audio uploaded successfully.");
          }
          else {
            window.alert(response.msg);
          }
        }
        else {
          window.alert("Please fill audio information.");
        }
      }

      else {
        window.alert("Please record audio first.");
      }
    }
    else {
      window.alert("Please stop recording.");
    }
  }

  return (
    <NewRecordingContainer data-testid="recordingContainer">
      <RecordingContainer>
        <FormH1>Record audio</FormH1>
          <RecordingMic
            style="width: 100%"
            record={recording}
            className="sound-wave"
            onStop={(e) => onStop(e)}
            strokeColor="#1CE4B0"
            backgroundColor="#FFFFFF"/>
        <RecordingButtonContainer>
          <RecordButton onClick={() => startRecording()} type="button">Start</RecordButton>
          <RecordButton onClick={() => stopRecording()} type="button">Stop</RecordButton>
        </RecordingButtonContainer>
      </RecordingContainer>
      <InfoContainer>
        <RecordingForm>
          <FormH1>Audio information</FormH1>
          <FormLabel htmlFor="for" >Language</FormLabel>
          <SelectContainer>
            <Select
              value={language}
              onChange={languageChanged}
              options={languageOptions}
            />
          </SelectContainer>
          <FormLabel htmlFor="for" >Username</FormLabel>
          <FormInput type="text" value={username} onChange={(e) => usernameChanged(e)}></FormInput>

          <FormLabel htmlFor="for" >Title</FormLabel>
          <FormInput type="text" value={title} onChange={(e) => titleChanged(e)}></FormInput>

          <FormLabel htmlFor="for" >Description</FormLabel>
          <FormDesc type="textarea" value={desc} onChange={(e) => descChanged(e)}></FormDesc>

          <FormLabel htmlFor="for" >Genre</FormLabel>
          <FormInput type="text" value={genre} onChange={(e) => genreChanged(e)}></FormInput>

          <FormLabel htmlFor="for" >Difficulty</FormLabel>
          <SelectContainer>
            <Select
              value={difficulty}
              onChange={difficultyChanged}
              options={difficultyOptions}
            />
          </SelectContainer>
          <FormButton onClick={() => uploadAudio()} type="button">Upload</FormButton>
        </RecordingForm>
      </InfoContainer>
    </NewRecordingContainer>
  )
}

export default NewRecording