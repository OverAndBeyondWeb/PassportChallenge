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
    numChildren: 1,
    lowerbound: 1,
    upperbound: 100,
    factories:[],
    errors: {
      validBounds: true,
      hasName: true
    }
  }

  componentDidMount() {

    // Check that the browser supports servrr sent events
    // If so, set up an event stream when component mounts
    if(!!window.EventSource) {

      // Connect EventSource to backend route
      const source = new EventSource('/eventstream');

      // Event listener for the open event
      source.addEventListener('open', function() {
        console.log('open');
      }, false);

      // Event listener for the message event
      source.addEventListener('message', (e) => {
        console.log(e.data);
        
        // This event is fired when data is changed in the database
        // we then make a new ajax call to the api and update the DOM
        axios.get('/api/factories')
          .then(res => {
            this.setState({
              factories: res.data
            })
          })
          .catch(err => console.log(err));

      }, false);

    } else {
      // Inform the user that their browser does'nt support server sent events
      console.log('your browser doesn\'t support SSE');
    }

    // Retrieve initial data from the api when component is mounted
    axios.get('/api/factories')
      .then(res => {
        this.setState({
          factories: res.data
        })
      })
      .catch();
  }

  // Change boolean value to signal modal to show or hide
  modalToggle = () => {
    this.setState({
      modalVisilble: !this.state.modalVisilble
    });
  }

  // Calls modalToggle
  revealForm = () => {
    this.modalToggle();
  }

  // Submits form data to database
  addFactory = (e) => {

    // Prevent default submit form behavior
    e.preventDefault();

    // Trigger error if factory name field is empty
    if(!this.state.factoryName) {
      this.setState({
        errors: {
          validBounds: this.state.errors.validBounds,
          hasName: false
        }
      });
      return;
    }

    // Collect data from all form fields
    let data = {
      name: this.state.factoryName,
      numChildren: this.state.numChildren,
      lowerbound: this.state.lowerbound,
      upperbound: this.state.upperbound
    };
    
    // Make a post request with form field data
    axios.post('/api/factory', data)

      // Log response if successful
      .then(res => {
        console.log(res);
      })

      // Log error if unsuccessful
      .catch(err => {
        console.log(err.response)

        // Use errors from backend
      });

    // Close modal  
    this.modalToggle();

    this.setState({
      factoryName: '',
      numChildren: 1,
      lowerbound: 1,
      upperbound: 100,
    });
  }

  // Clear database
  deleteAllFactories = () => {
    axios.delete('/api/factories')

      // Log response if successful
      .then(res => console.log(res))

      // Log error if unsuccessful
      .catch(err => console.log(err));
  }

  handleInput = (e) => { 

    // Keep state values in sync with form values on change
    this.setState({
      [e.target.name]: e.target.value
    });

    // reference form field that fired current event
    let target = e.target;

    // Set state using a function to avoid asynchronous issues
    this.setState((prevState, props) => {
      return ({
        errors: {

          // Set validBounds with the return value a function call
          validBounds: this.checkBounds(prevState),

          // Set hasName with the return value a function call if the return
          // value is not undefined or null, else use state value
          hasName: this.checkNameField(target) || prevState.errors.hasName
        }
      })
    });
  }


  // Validate upper and lower bound form fields
  checkBounds = (prevState) => {

    // Won't allow lower bound to go below zero
    if(+prevState.lowerbound <= 0) {
      this.setState({
        lowerbound: 0
      });
    }

    // Returns true if upperbound value is greater than lower,
    // else returns false, allows form to show an error message
    // to the user
    return +prevState.upperbound > +prevState.lowerbound; 
  }

  // Checks name form field is not empty
  checkNameField = (target) => {
    if(target.name === 'factoryName') {
      return !!target.value; 
    }
  }


  // Render Components with props
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
            errors={this.state.errors}
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
                    key={factory._id}
                  />)
        })}
      </div>
    )
  }
};

// Make component available in other files
export default TreeView;
