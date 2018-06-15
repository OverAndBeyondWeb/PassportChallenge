import React from 'react';
import './Factory.css';
import Stem from '../Stem/Stem';
const Factory = (props) => {
  return (
    <div className="Factory">
      <Stem height="36px" width="20px" shift="-16px"/>
      <div className="factory-name">
        <h1>{props.name}</h1>
      </div>
      <div className="controls">
        <button>Rename</button>
        <button>Delete</button>
      </div>
    </div>
  )
};

export default Factory; 
