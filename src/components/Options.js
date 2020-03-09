import React from 'react';
import Option from './Option';
import Spinner from './Spinner';

const Options = props => {
  if(props.spinner) return <Spinner />;
  if(props.options.length === 0) return ( 
    <p className="option-text">Add a new option!</p>
  );
  return (
    <section>
      <div className="options-head">
        <span>Your Options</span>
        <span className="options-head__reset"
        onClick={() => props.handleReset()}>
          Reset
        </span>
      </div>
      {props.options.map((e, i) => {
        return <Option {...e} num={i + 1} key={e._id} handleRemoveOption={props.handleRemoveOption} />
      })}
    </section>
)};

export default Options;