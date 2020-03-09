import React from "react";

const OptionModal = props => {
  const classes = ["modal", props.selectedOption ? "modal--open" : "modal--close"];
  return (
    <div className={classes.join(' ')}>
      <span className="modal__text">{props.selectedOption}</span>
      <button onClick={props.handleModal} className="modal__btn">Done</button>
    </div>
  )
};

export default OptionModal;