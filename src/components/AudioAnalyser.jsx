import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import WaveformVisualiser from './WaveformVisualiser';
import FrequencyVisualiser from './FrequencyVisualiser';

const AudioAnalyser = ({ audio }) => {
  const analyser = useRef();

  const getTimeDomainData = (styleAdjuster) => {
    const bufferLength = analyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.current.getByteTimeDomainData(dataArray);
    styleAdjuster(dataArray);
  };
  const getFrequencyData = (styleAdjuster) => {
    const bufferLength = analyser.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyser.current.getByteFrequencyData(dataArray);
    styleAdjuster(dataArray);
  };

  useEffect(() => {
    if (!audio) return () => {};
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(audio);
    analyser.current = audioContext.createAnalyser();
    source.connect(audioContext.destination);
    source.connect(analyser.current);

    return () => {
      analyser.current.disconnect();
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
