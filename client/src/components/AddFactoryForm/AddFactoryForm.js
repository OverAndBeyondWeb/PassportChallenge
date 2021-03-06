import React from 'react';
import './AddFactoryForm.css';

const AddFactoryForm = (props) => {
  return (
    <form className="AddFactoryForm">
      <h1>Create a New Factory</h1>
      <fieldset>
        <div className="indivut-block">
          <label htmlFor="factoryName">Name:</label>
          <input
            type="text"
            name="factoryName"
            placeholder="required"
            value={props.factoryName}
            onChange={props.handleInput}
          />
          <p className={(props.errors.hasName ? null : "show-error") + " error"}>Your factory must have a name</p>
        </div>
        <p className="input-block">
          <label htmlFor="numChildren">Children:</label>
          <select name="numChildren"
            value={props.numChildren}
            onChange={props.handleInput}
          > 
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
        </p>
        
      </fieldset>
      <fieldset>
        <p className="input-block">
          <label htmlFor="lowerbound">Lower Bound</label>
          <input name="lowerbound"
            className={props.errors.validBounds ? "valid-bounds" : "invalid-bounds"}
            type="number"
            value={props.lowerbound}
            onChange={props.handleInput}
          />
        </p>
        <p className="input-block">
          <label htmlFor="upperbound">Upper Bound</label>
          <input name="upperbound"
            className={props.errors.validBounds ? "valid-bounds" : "invalid-bounds"}
            type="number"
            value={props.upperbound}
            onChange={props.handleInput}
          />
        </p>
      </fieldset>
      <p 
        className={(props.errors.validBounds ? null : "show-error") + " error"}
        style={{top: '-10px'}}
        >Lower must be less than upper!</p>
      <button disabled={!props.errors.validBounds} onClick={props.addFactory}>Add Factory</button>
    </form>
  )
};

export default AddFactoryForm;
