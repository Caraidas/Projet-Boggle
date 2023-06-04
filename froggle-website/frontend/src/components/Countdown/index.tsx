import React, { useState, useEffect } from 'react';

const Countdown = ({ duration, onCountdownFinished }) => {
  
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      if (remainingTime <= 0) {
        clearInterval(interval);
        console.log("Temps écoulé!")
        onCountdownFinished(); 
      } else {
        setRemainingTime(prevTime => prevTime - 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime]);

  const formatTime = time => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;

      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  return (
    <>
      {formatTime(remainingTime)}
    </>
  );
};

export default Countdown;
