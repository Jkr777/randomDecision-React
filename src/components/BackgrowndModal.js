import React from 'react';

const BackgrowndModal = props => {
  const classes = ["background-modal", props.selectedOption ? "background-modal--open": "background-modal--close"];
  return (
    <div onClick={props.handleModal} className={classes.join(' ')}></div>
  )
};

export default BackgrowndModal;