import React, { Component } from 'react';
import './Factory.css';
import Stem from '../Stem/Stem';
import Child from '../Child/Child';
import axios from 'axios';
const keyIndex = require('react-key-index');

class Factory extends Component {
  
  state = {
    rename: false,
    name: 'Factory',
    renameBtnText: 'Rename'
  }

  toggleRename = () => {
    this.setState({
      rename: !this.state.rename
    })
  }

  revealTextBox = () => {
    this.toggleRename();
    this.toggleBtnText();
    if(this.state.rename) {
      this.acceptNewName(this.props.id, this.state.name);
    }
  }

  toggleBtnText = () => {
    let btnText = this.state.rename ? 'Rename' : 'Accept';
    this.setState({
      renameBtnText: btnText
    });
  }

  acceptNewName = (id, newName) => {
    console.log('hit')
    axios.put('/api/factory/' + id, {newName: newName})
      .then(res => console.log(res))
      .catch(err => console.log(err))
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
    let children = keyIndex(this.props.children, 1).map((child) => {
      return <Child number={child.value} key={child.id}/>
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
          <div 
            className="btn"
            onClick={this.revealTextBox}>{this.state.renameBtnText}</div>
          <div 
            className="btn"
            onClick={() => this.deleteSelf(this.props.id)}>Delete</div>
        </div>
        {children}
      </div>
    )
  }
  
};

export default Factory; 
