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
    upperbound: 100,
    factories:[],
    validBounds: true
  }

  componentDidMount() {
    if(!!window.EventSource) {

      const source = new EventSource('/eventstream');

      source.addEventListener('open', function() {
        console.log('open');
      }, false);

      source.addEventListener('message', (e) => {
        console.log(e.data);
        
        axios.get('/api/factories')
          .then(res => {
            this.setState({
              factories: res.data
            })
          })
          .catch();

      }, false);

    } else {
      console.log('your browser doesn\'t support SSE');
    }

    axios.get('/api/factories')
      .then(res => {
        this.setState({
          factories: res.data
        })
      })
      .catch();
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
    axios.delete('/api/factories')
      .then()
      .catch()
  }

  handleInput = (e) => { 
    this.setState({
      [e.target.name]: e.target.value
    })
    this.checkBounds();
  }

  checkBounds() {
    let valid = +this.state.upperbound > +this.state.lowerbound;
    if(this.state.validBounds !== valid) {
      this.setState({
        validBounds: valid
      });
    }
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
            validBounds={this.state.validBounds}
          />
        </Modal>
        <Root
          revealForm={this.revealForm}
          deleteAllFactories={this.deleteAllFactories}
        />
        {this.state.factories.map(factory => {
          return (<Factory 
                    name={factory.name}
                    children={factory.children}
                    id={factory._id}
                  />)
        })}
      </div>
    )
  }
};

export default TreeView;
