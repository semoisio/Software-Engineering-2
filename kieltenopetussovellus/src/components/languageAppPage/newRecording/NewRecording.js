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
  RecordingMic,
  AudioPlayer,
} from './NewRecordingElements';
import {
  LoaderContainer,
    LoaderText,
} from '../searchElement/SearchElements';
import { genreOptions, languageOptions, difficultyOptions } from '../../../tools/defaultOptions';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import NotifyDialog from '../../../dialogs/NotifyDialog';
import Loader from "react-loader-spinner";
const fs = require('fs');


const NewRecording = () => {
  const [recording, setRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState(null);
  const [username, setUsername] = useState(localStorage.getItem("user"));
  const [language, setLanguage] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [genre, setGenre] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [uploading, setUploading] = useState(false);

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


  const startRecording = () => {
    if (recordedAudio) {
      let dialogprops = {
        title: "Confirm audio overwrite",
        message: "Previous audio will be lost if you start recording. Continue?",
        clickOk: () => {
          setRecording(true);
        }
      }
      ConfirmDialog(dialogprops);
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
    let dialogprops = null;
    // while not recordin
    if (!recording) {

      // check that audio is ready
      if (recordedAudio) {


        // check that fields are given
        if (language && username.length > 0 && title.length > 0 && desc.length > 0 && genre && difficulty) {
          setUploading(true);

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
          fd.append('genre', genre.value);
          fd.append('difficulty', difficulty.value);

          // send formdata to server
          const requestOptions = {
            method: 'POST',
            body: fd
          };
          const result = await fetch("http://127.0.0.1:3001/audio", requestOptions);
          let response = await result.json();
          setUploading(false);

          if (response.status === "OK") {
            dialogprops = {
              title: "Success",
              message: "Audio uploaded successfully.",
            }
            setRecordedAudio(null);
            setLanguage(null);
            setUsername("");
            setTitle("");
            setDesc("");
            setGenre(null);
            setDifficulty(null);
          }
          else {
            dialogprops = {
              title: "Error",
              message: response.msg + ".",
            }
          }
        }
        else {
          dialogprops = {
            title: "Missing information",
            message: "Please fill audio information.",
          }
        }
      }

      else {
        dialogprops = {
          title: "Missing audio",
          message: "Please record audio first.",
        }
      }
    }
    else {
      dialogprops = {
        title: "Recording in progress",
        message: "Please stop recording.",
      }
    }
    NotifyDialog(dialogprops);
  }



  return (
    <>
      {
        uploading ?
          <LoaderContainer>
            <LoaderText>Uploading</LoaderText>
            <Loader
              type="TailSpin"
              color="#00BFFF"
              height={50}
              width={50}
            />
          </LoaderContainer> :

          <NewRecordingContainer data-testid="recordingContainer">
            <RecordingContainer>
              <FormH1>Record audio</FormH1>
              <RecordingMic
                style="width: 100%"
                record={recording}
                className="sound-wave"
                onStop={(e) => onStop(e)}
                strokeColor="#1CE4B0"
                backgroundColor="#FFFFFF" />
              <RecordingButtonContainer>
                <RecordButton onClick={() => startRecording()} type="button">Start</RecordButton>
                <RecordButton onClick={() => stopRecording()} type="button">Stop</RecordButton>
              </RecordingButtonContainer>
            </RecordingContainer>
            {
              recordedAudio ?
                <InfoContainer>
                  <RecordingForm>
                    <FormH1>Audio information</FormH1>
                    <AudioPlayer controls>
                      <source src={recordedAudio.blobURL} />
                    </AudioPlayer>
                    <FormLabel htmlFor="for" >Language</FormLabel>
                    <SelectContainer>
                      <Select
                        value={language}
                        onChange={languageChanged}
                        options={languageOptions}
                      />
                    </SelectContainer>
                    <FormLabel htmlFor="for" >Title</FormLabel>
                    <FormInput type="text" value={title} onChange={(e) => titleChanged(e)}></FormInput>

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
                    <FormButton onClick={() => uploadAudio()} type="button">Upload</FormButton>
                  </RecordingForm>
                </InfoContainer> : null
            }
          </NewRecordingContainer>
      }
    </>
  )
}

export default NewRecording