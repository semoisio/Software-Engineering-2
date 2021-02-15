import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import { RecordingContainer } from './NewRecordingElements';
const fs = require('fs');

const NewRecording = () => {
  const [recording, setRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState("");
  const [username, setUsername] = useState("username");
  const [language, setLanguage] = useState("language");
  const [title, setTitle] = useState("title");
  const [desc, setDesc] = useState("description");

  const startRecording = () => {
    setRecording(true);
  }

  const stopRecording = () => {
    setRecording(false);
  }

  const onData = () => {

  }

  const onStop = (recordedBlob) => {
    setRecordedAudio(recordedBlob);
  }

  const uploadAudio = async () => {
    console.log("clicked upload");
    if (recordedAudio) {
      // get blob from url
      let blob = await fetch(recordedAudio.blobURL).then(r => r.blob());
      // create formdata from blob
      var file = new File([blob], "test", { type: "audio/webm" });
      let fd = new FormData();
      fd.append('audio', file);
      fd.append('username', username);
      fd.append('language', language);
      fd.append('title', title);
      fd.append('desc', desc);

      // send formdata to server
      const requestOptions = {
        method: 'POST',
        body: fd
      };
      const result = await fetch("http://127.0.0.1:3001/audio", requestOptions);
      let response = await result.json();

      // just for testing, get data from server
      const getAudio = await fetch("http://127.0.0.1:3001/audio" + "?title=title&file=true").then(r => r.blob());
      // paste url to browser to confirm
      console.log(URL.createObjectURL(getAudio));

      // testing audio search
      const findAudio = await fetch("http://127.0.0.1:3001/audio" + "?title=title");
      console.log(await findAudio.json());
      if (response.status === "OK") {
        console.log("ok")
      }
      else {
        console.log("notok")
      }
    }
    else {
      console.log("Audio not ready");
    }
  }

  return (
    <RecordingContainer data-testid="recordingContainer">
      <ReactMic
        record={recording}
        className="sound-wave"
        onStop={(e) => onStop(e)}
        onData={() => onData()}
        strokeColor="#000000"
        backgroundColor="#FF4081" />
      <button onClick={() => startRecording()} type="button">Start</button>
      <button onClick={() => stopRecording()} type="button">Stop</button>

      <button onClick={() => uploadAudio()} type="button">Upload</button>
    </RecordingContainer>
  )
}

export default NewRecording

/*
export default class NewRecording extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        record: false
      }
    }

    startRecording = () => {
      this.setState({ record: true });
    }

    stopRecording = () => {
      this.setState({ record: false });
    }

    onData(recordedBlob) {
      console.log('chunk of real-time data is: ', recordedBlob);
    }

    onStop(recordedBlob) {
      console.log('recordedBlob is: ', recordedBlob);
    }

    render() {
      return (
        <div>
          <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#FF4081" />
          <button onClick={this.startRecording} type="button">Start</button>
          <button onClick={this.stopRecording} type="button">Stop</button>
        </div>
      );
    }
  }
*/
