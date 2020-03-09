import React from 'react';
import {ReactComponent as Trash} from '../images/Icon Trash.svg';

const Option = props => (
    <p className="option-container">{props.num}. {props.text} <span onClick={()=> props.handleRemoveOption(props._id)}><Trash className="trash-icon" /></span></p>
);

export default Option;