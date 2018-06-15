import React from 'react';
import './Stem.css';

const Stem = (props) => {
  return (
    <div 
      className="Stem"
      style={{
        height: props.height,
        width: props.width,
        transform: `translateY(${props.shift})`
      }}>
    </div>
  )
};

export default Stem;

