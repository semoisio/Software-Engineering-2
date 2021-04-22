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
  QuizContainer,
  QuizCheck,
  QuestionAnswer,
  UploadButtonContainer,
} from './NewRecordingElements';
import {
  LoaderContainer,
  LoaderText,
} from '../searchElement/SearchElements';
import { genreOptions, languageOptions, difficultyOptions } from '../../../tools/defaultOptions';
import ConfirmDialog from '../../../dialogs/ConfirmDialog';
import NotifyDialog from '../../../dialogs/NotifyDialog';
import Loader from "react-loader-spinner";
import FooterJS from '../../footer/Footer';
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
  const [chkQuiz, setChkQuiz] = useState(false);

  // quiz inputs
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [a3, setA3] = useState("");

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

  const chkQuizChanged = () => {
    setChkQuiz(!chkQuiz);
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

  const clearFields = () => {
    setLanguage(null);
    setTitle("");
    setDesc("");
    setGenre(null);
    setDifficulty(null);
    clearQuiz();
  }

  const clearQuiz = () => {
    setQ1("");
    setQ2("");
    setQ3("");
    setA1("");
    setA2("");
    setA3("");
  }


  const startRecording = () => {
    if (recordedAudio) {
      let dialogprops = {
        title: "Confirm audio overwrite",
        message: "Previous audio will be lost if you start recording. Continue?",
        clickOk: () => {
          setRecording(true);
          clearFields();
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

  const clickCancel = () => {
    clearFields();
  }

  const clickRecordAgain = () => {
    if (recordedAudio) {
      let dialogprops = {
        title: "Confirm audio overwrite",
        message: "Previous audio will be lost. Continue?",
        clickOk: () => {
          setRecordedAudio(null);
        }
      }
      ConfirmDialog(dialogprops);
    }
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

  const uploadAudio = async () => {
    let dialogprops = null;
    // while not recordin
    if (!recording) {

      // check that audio is ready
      if (recordedAudio) {


        // check that fields are given
        if (language && title.length > 0 && desc.length > 0 && genre && difficulty) {


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

          // add quiz
          let quiz = [];
          if (chkQuiz) {
            let message = validateQuiz();
            if (message !== "") {
              dialogprops = {
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
            }
          }
          // sending quiz as string and parsing it back to array in server
          fd.append('quiz', JSON.stringify(quiz));

          // if quiz was ok
          if (dialogprops === null) {
            setUploading(true);
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
              clearFields();
              setRecordedAudio(null);
            }
            else {
              dialogprops = {
                title: "Error",
                message: response.msg + ".",
              }
            }
          }
          // quiz not ok 
          else {
            NotifyDialog(dialogprops);
          }
        }
        // audio info missing
        else {
          dialogprops = {
            title: "Missing information",
            message: "Please fill audio information.",
          }
        }
      }
      // audio not recorded
      else {
        dialogprops = {
          title: "Missing audio",
          message: "Please record audio first.",
        }
      }
    }
    // recording ongoing
    else {
      dialogprops = {
        title: "Recording in progress",
        message: "Please stop recording.",
      }
    }
    if (!dialogprops.clickOk) {
      dialogprops.clickOk = () => { };
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
            <InfoContainer>
              {
                recordedAudio === null ?
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
                  </RecordingContainer> :
                  <RecordingContainer>
                    <FormH1>Listen audio</FormH1>
                    <AudioPlayer controls>
                      <source src={recordedAudio.blobURL} />
                    </AudioPlayer>
                    <RecordingButtonContainer>
                      <RecordButton onClick={() => clickRecordAgain()}>Record again</RecordButton>
                    </RecordingButtonContainer>
                  </RecordingContainer>
              }
              {
                recording ? null :
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

                    <FormLabel htmlFor="for" >
                      <QuizCheck type="checkbox"
                        checked={chkQuiz}
                        onChange={(e) => chkQuizChanged(e)} />
                      Add quiz
                    </FormLabel>
                    {
                      chkQuiz ?
                        <QuizContainer>
                          <QuestionAnswer>
                            <FormLabel htmlFor="for" >Question 1</FormLabel>
                            <FormInput type="text" value={q1} onChange={(e) => { q1Changed(e) }}></FormInput>
                            <FormLabel htmlFor="for">Answer</FormLabel>
                            <FormInput type="text" value={a1} onChange={(e) => { a1Changed(e) }}></FormInput>
                          </QuestionAnswer>
                          <QuestionAnswer>
                            <FormLabel htmlFor="for">Question 2 (optional)</FormLabel>
                            <FormInput type="text" value={q2} onChange={(e) => { q2Changed(e) }}></FormInput>
                            <FormLabel htmlFor="for">Answer</FormLabel>
                            <FormInput type="text" value={a2} onChange={(e) => { a2Changed(e) }}></FormInput>
                          </QuestionAnswer>
                          <QuestionAnswer>
                            <FormLabel htmlFor="for">Question 3 (optional)</FormLabel>
                            <FormInput type="text" value={q3} onChange={(e) => { q3Changed(e) }}></FormInput>
                            <FormLabel htmlFor="for">Answer</FormLabel>
                            <FormInput type="text" value={a3} onChange={(e) => { a3Changed(e) }}></FormInput>
                          </QuestionAnswer>

                        </QuizContainer> : null
                    }
                  </RecordingForm>
              }
              {
                recording ? null :
                  <UploadButtonContainer>
                    <FormButton onClick={() => uploadAudio()} type="button">Upload</FormButton>
                    {
                      chkQuiz ?
                        <FormButton className="button2" onClick={() => clearQuiz()} type="button">Clear quiz</FormButton>
                        : null
                    }
                    <FormButton className="button2" onClick={() => clickCancel()} type="button">Clear all</FormButton>
                  </UploadButtonContainer>
              }
            </InfoContainer>

          </NewRecordingContainer>
      }
      <FooterJS />
    </>
  )
}

export default NewRecording