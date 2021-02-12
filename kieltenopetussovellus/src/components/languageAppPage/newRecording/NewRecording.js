import React, { useState } from 'react';
import { ReactMic } from 'react-mic';
import { RecordingContainer } from './NewRecordingElements';

const NewRecording = () => {
  const [recording, setRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState("");
  const [data, setData] = useState([]);

  const startRecording = () => {
    setRecording(true);
  }

  const stopRecording = () => {
    setRecording(false);
  }

  const onData = (recordedBlob) => {
    console.log('chunk of real-time data is: ', recordedBlob);
    setData(data.concat([recordedBlob]));
  }

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    setRecordedAudio(recordedBlob);
  }

  const uploadAudio = async () => {
    // get blob from url
    let blob = await fetch(recordedAudio.blobURL).then(r => r.blob());

    // create formdata from blob
    var file = new File([blob], "test", { type: "audio/webm" });
    let fd = new FormData();
    fd.append('audio', file);

    // send formdata to server
    const requestOptions = {
      method: 'POST',
      body: fd
    };
    const result = await fetch("http://127.0.0.1:3001/audio", requestOptions);
  }

  return (
    <RecordingContainer data-testid="recordingContainer">
      <ReactMic
        record={recording}
        className="sound-wave"
        onStop={(e) => onStop(e)}
        onData={(e) => onData(e)}
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
