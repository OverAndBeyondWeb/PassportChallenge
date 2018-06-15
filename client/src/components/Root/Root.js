import React from 'react';
import './Root.css';

const Root = (props) => {
  return (
    <div className="Root">
      <div className="title">
        <h1>Root</h1>
      </div>
      <div className="controls">
        <button onClick={props.revealForm}>Add Factory</button>
        <button>Delete All</button>
      </div>
    </div>
  )
};

export default Root; 
