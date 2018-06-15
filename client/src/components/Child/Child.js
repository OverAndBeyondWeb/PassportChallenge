import React from 'react';
import './Child.css';
import Stem from '../Stem/Stem';

const Child = (props) => {
  return (
    <div className="Child">
      <Stem height="18px" width="20px" shift="-8px"/>
      <span>{props.number}</span>
    </div>
  )
};

export default Child;
