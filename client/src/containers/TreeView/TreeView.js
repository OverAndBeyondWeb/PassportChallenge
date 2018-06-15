import React, { Component } from 'react';
import './TreeView.css';
import Root from '../../components/Root/Root';
import Factory from '../../components/Factory/Factory';
import Modal from '../../components/Modal/Modal';
import AddFactoryForm from '../../components/AddFactoryForm/AddFactoryForm';
import axios from 'axios';

class TreeView extends Component {

  state = {
    modalVisilble: false,
    factoryName: '',
    numChildren: 0,
    lowerbound: 1,
    upperbound: 100
  }

  modalToggle = () => {
    this.setState({
      modalVisilble: !this.state.modalVisilble
    });
  }

  revealForm = () => {
    this.modalToggle();
  }

  addFactory = (e) => {
    e.preventDefault();
    console.log('factory added');
    console.log(this.state)
    this.modalToggle();
  }

  deleteAllFactories = () => {
    console.log('deleted all');
  }

  handleInput = (e) => {
    
    this.setState({
      [e.target.name]: e.target.value
    })
    
    console.log(e.target.value);
  }

  render() {
    return (
      <div className="TreeView">
        <Modal 
          show={this.state.modalVisilble}
          modalToggle={this.modalToggle}
        >
          <AddFactoryForm
            addFactory={this.addFactory}
            factoryName={this.state.factoryName}
            numChildren={this.state.numChildren}
            lowerbound={this.state.lowerbound}
            upperbound={this.state.upperbound}
            handleInput={this.handleInput}
          />
        </Modal>
        <Root
          revealForm={this.revealForm}
          deleteAllFactories={this.deleteAllFactories}
        />
        <Factory 
          name="Factory"
          childData={[100, 500, 78]}
        />
        <Factory 
          name="Factory"
          childData={[100, 10, 78]}
        />
      </div>
    )
  }
};

export default TreeView;
