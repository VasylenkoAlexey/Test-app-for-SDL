import React, { useRef, useEffect } from 'react';

// TODO Add mobile handlers, touchstart event probably 
function useClickOutsideHandler(ref, handler, keyCodes) {

  function handleKeyPress(event) {

    if (keyCodes.includes(event.keyCode)) {
      handler();
    }
  }


  function handleClick(event) {

    if (ref.current && !ref.current.contains(event.target)) {
      handler();
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyPress);

    };
  });
}

export default function ClickOutsideHandler(props) {
  const wrapperRef = useRef(null);
  useClickOutsideHandler(wrapperRef, props.outsideClickLogic, props.keyCodes);

  return <div className={props.className} style={props.style} ref={wrapperRef}>{props.children}</div>;
}