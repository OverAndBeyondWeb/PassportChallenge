import React, { Component } from 'react';
import './Factory.css';
import Stem from '../Stem/Stem';
import Child from '../Child/Child';
import axios from 'axios';

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

  deleteSelf = (id) => {
    axios.delete('/api/factory/' + id)
      .then()
      .catch();
  }

  handleInput = (e) => {
    this.setState({
      name: e.target.value
    });
  }
  

  render() {
    let children = this.props.children.map((child, index) => {
      return <Child number={child} key={child + index}/>
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
             : <h1>{this.props.name}</h1>}
        </div>
        <div className="controls">
          <button onClick={this.revealTextBox}>Rename</button>
          <button onClick={() => this.deleteSelf(this.props.id)}>Delete</button>
        </div>
        {children}
      </div>
    )
  }
  
};

export default Factory; 
