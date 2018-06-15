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

  componentDidMount() {
    if(!!window.EventSource) {

      const source = new EventSource('/eventstream');

      source.addEventListener('open', function() {
        console.log('open');
      }, false);

      source.addEventListener('message', (e) => {
        console.log('pwert')
        console.log(e.data);
        // => Hello world!
    });
    } else {
      console.log('your browser doesn\'t support SSE');
    }
  }

  test = () => {
    axios.get('/u')
      .then(res => console.log('res', res));
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
    let data = {
      name: this.state.factoryName,
      numChildren: +this.state.numChildren,
      lowerbound: +this.state.lowerbound,
      upperbound: +this.state.upperbound
    };
    axios.post('/api/factory', data);
    this.modalToggle();
  }

  deleteAllFactories = () => {
    console.log('deleted all');
  }

  handleInput = (e) => { 
    this.setState({
      [e.target.name]: e.target.value
    })
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
        <button onClick={this.test}>test</button>
      </div>
    )
  }
};

export default TreeView;
