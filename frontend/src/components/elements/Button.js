import React from 'react'

export default function Button(props) {
  return (
    <div>
      <button className={`ui button ${props.button.type}`} onClick={props.onClick}>{props.button.text}</button>
    </div>
  );
};