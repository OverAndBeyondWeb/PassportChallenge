import React from 'react';
import './Root.css';

const Root = (props) => {
  return (
    <div className="Root">
      <div className="title">
        <h1>Root</h1>
      </div>
      <div className="controls">
        <div 
          className="btn add"
          onClick={props.revealForm}>Add Factory</div>
        <div 
          className="btn delete"
          onClick={props.deleteAllFactories}>Delete All</div>
      </div>
    </div>
  )
};

export default Root; 
