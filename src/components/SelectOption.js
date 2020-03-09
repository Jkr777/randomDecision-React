import React from 'react';

const SelectOption = props => (
  <button className="btn-select-option" disabled={props.options.length === 0} onClick={props.handleSelectOption}>What Should I Do ?</button>
);

export default SelectOption;