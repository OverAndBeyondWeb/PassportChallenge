import React, { Component } from 'react';
import './TreeView.css';
import Root from '../../components/Root/Root';
import Factory from '../../components/Factory/Factory';

class TreeView extends Component {

  state = {

  }

  render() {
    return (
      <div className="TreeView">
        <Root/>
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
