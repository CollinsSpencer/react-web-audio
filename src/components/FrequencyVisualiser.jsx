import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const FrequencyVisualiser = ({ getFrequencyData }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef();

  const draw = (audioData) => {
    const canvas = canvasRef.current;
    canvas.width = document.body.clientWidth;
    const { height, width } = canvas;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    let x = 0;
    const barWidth = width / audioData.length;

    audioData.forEach((uint8Value) => {
      const barHeight = uint8Value;
      const r = uint8Value;
      const g = (255 - uint8Value) / 2;
      const b = (255 - uint8Value) / 4;
      context.fillStyle = `rgb(${r},${g},${b})`;
      context.fillRect(x, (height - barHeight) / 2, barWidth, barHeight);
      x += barWidth;
    });
  };

  const animate = useCallback(() => {
    getFrequencyData(draw);
    requestRef.current = requestAnimationFrame(animate);
  }, [getFrequencyData]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, [animate]);

  return <canvas width="600" height="256" ref={canvasRef} />;
};

FrequencyVisualiser.propTypes = {
  getFrequencyData: PropTypes.func.isRequired,
};

export default FrequencyVisualiser;
