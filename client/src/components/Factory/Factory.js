import React, { Component } from 'react';
import './Factory.css';
import Stem from '../Stem/Stem';
import Child from '../Child/Child';

class Factory extends Component {
  
  state = {
    rename: false,
    name: 'Factory'
  }

  toggleRename = () => {
    this.setState({
      rename: !this.state.rename
    })
  }

  revealTextBox = () => {
    console.log('text');
    this.toggleRename();
  }

  deleteSelf = () => {
    console.log('deleted');
  }

  handleInput = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  

  render() {
    let children = this.props.childData.map(data => {
    let randomNumber = Math.floor((Math.random() * data) + 1);
      return <Child number={randomNumber} key={randomNumber}/>
    });
    return (
      <div className="Factory">
        <Stem height="36px" width="20px" shift="-16px"/>
        <div className="factory-name">
          {this.state.rename ?
             <input 
              type="text" 
              autoFocus
              onChange={this.handleInput}
              value={this.state.name}
            /> 
             : <h1>{this.state.name}</h1>}
        </div>
        <div className="controls">
          <button onClick={this.revealTextBox}>Rename</button>
          <button onClick={this.deleteSelf}>Delete</button>
        </div>
        {children}
      </div>
    )
  }
  
};

export default Factory; 
