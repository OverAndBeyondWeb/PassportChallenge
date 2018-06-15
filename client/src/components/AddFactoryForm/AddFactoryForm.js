import React from 'react';
import './AddFactoryForm.css';

const AddFactoryForm = (props) => {
  return (
    <form className="AddFactoryForm">
      <h1>New Factory</h1>
      <label htmlFor="factoryName">Name</label>
      <input
        type="text"
        name="factoryName"
        placeholder="factory name"
        value={props.factoryName}
        onChange={props.handleInput}
      />
      <label htmlFor="numChildren">Children</label>
      <select name="numChildren"
        value={props.numChildren}
        onChange={props.handleInput}
      > 
        <option value="0">0</option> 
        <option value="1">1</option> 
        <option value="2" >2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        <option value="13">13</option>
        <option value="14">14</option>
        <option value="15">15</option>
      </select>
      <label htmlFor="lowerbound">Lower Bound</label>
      <input name="lowerbound"
        type="number"
        value={props.lowerbound}
        onChange={props.handleInput}
      />
      <label htmlFor="upperbound">Upper Bound</label>
      <input name="upperbound"
        type="number"
        value={props.upperbound}
        onChange={props.handleInput}
      />
      <button onClick={props.addFactory}>Add Factory</button>
    </form>
  )
};

export default AddFactoryForm;
