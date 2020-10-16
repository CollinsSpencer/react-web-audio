import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import WaveformVisualiser from './WaveformVisualiser';
import FrequencyVisualiser from './FrequencyVisualiser';

const AudioAnalyser = ({ audio }) => {
  const [analyser, setAnalyser] = useState();

  const getTimeDomainData = () => {
    if (!analyser) return [];
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteTimeDomainData(dataArray);
    return dataArray;
  };
  const getFrequencyData = () => {
    if (!analyser) return [];
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    return dataArray;
  };

  useEffect(() => {
    if (!audio) return () => {};
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(audio);
    const newAnalyser = audioContext.createAnalyser();
    source.connect(audioContext.destination);
    source.connect(newAnalyser);
    setAnalyser(newAnalyser)

    return () => {
      newAnalyser.disconnect();
      source.disconnect();
    };
  }, [audio]);

  return audio ? (
    <>
      <WaveformVisualiser getTimeDomainData={getTimeDomainData} />
      <FrequencyVisualiser getFrequencyData={getFrequencyData} />
    </>
  ) : (
    <></>
  );
};

AudioAnalyser.defaultProps = {
  audio: null,
};
AudioAnalyser.propTypes = {
  audio: PropTypes.instanceOf(MediaStream),
};

export default AudioAnalyser;
