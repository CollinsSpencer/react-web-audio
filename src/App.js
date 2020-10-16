import React, { useState } from 'react';
import AudioAnalyser from './components/AudioAnalyser';
import './App.css';

const App = () => {
  const [audio, setAudio] = useState();

  const getMicrophone = async () => {
    const audioMedia = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setAudio(audioMedia);
  };

  const stopMicrophone = () => {
    audio.getTracks().forEach((track) => track.stop());
    setAudio(null);
  };

  const toggleMicrophone = () => {
    if (audio) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  };

  return (
    <div className="App">
      <header>
        <h1>React with Hooks + Web Audio API</h1>
      </header>
      <main>
        <div className="record">
          <button onClick={toggleMicrophone} type="button">
            {audio ? 'Stop microphone' : 'Get microphone input'}
          </button>
        </div>
        <AudioAnalyser audio={audio} />
      </main>
      <footer>
        <p>made with <span role="img" aria-label="love">❤️</span> by <a href="https://twitter.com/collinss97">@collinss97</a></p>
      </footer>
    </div>
  );
};

export default App;
