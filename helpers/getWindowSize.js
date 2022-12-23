import React, { useState, useEffect } from 'react';

const getView = (setView) => {

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []); 

  useEffect(() => {
    if (windowSize?.innerWidth > 420 && windowSize?.innerHeight > 400) {setView(true)}
    else {setView(false)}
  },[windowSize])

  return;
}
 
export default getView;

function getWindowSize() {
  if (typeof window != 'undefined') {
    const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
  }
}