import React from 'react';
import './Factory.css';
import Stem from '../Stem/Stem';
import Child from '../Child/Child';

const Factory = (props) => {
  
  let children = props.childData.map(data => {
    let randomNumber = Math.floor((Math.random() * data) + 1);
    return <Child number={randomNumber} key={randomNumber}/>
  });
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
      {children}
    </div>
  )
};

export default Factory; 
