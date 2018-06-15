import React, { Component } from 'react';
import './TreeView.css';
import Root from '../../components/Root/Root';
import Factory from '../../components/Factory/Factory';
import Modal from '../../components/Modal/Modal';
import axios from 'axios';

class TreeView extends Component {

  state = {
    modalVisilble: false
  }

  modalToggle = () => {
    this.setState({
      modalVisilble: !this.state.modalVisilble
    });
  }

  revealForm = () => {
    this.modalToggle();
  }

  addFactory = () => {
    console.log('factory added');
    
  }

  render() {
    return (
      <div className="TreeView">
        <Modal 
          show={this.state.modalVisilble}
          modalToggle={this.modalToggle}>
          <form>
            <input type="text"/>
            <input type="text"/>
          </form>
        </Modal>
        <Root
          revealForm={this.revealForm}
        />
        <Factory 
          name="Factory"
          childData={[100, 10, 78]}
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
