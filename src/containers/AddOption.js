import React, {Component} from 'react';

class AddOption extends Component {
  state = {
    text: ""
  };

  handleChange = e => {
    this.setState({
      text: e.target.value
    })
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleAddOption(this.state);
    this.props.handleRemoveError();
    e.target.reset();
  };

  render() {
    return (
      <form className="add-form" onSubmit={this.handleSubmit}>
        <input 
          type="text"
          name="option"
          onChange={this.handleChange}
          minLength="1"
          maxLength="25"
          autoFocus
          required
          className="add-form__input"
        />
        <button className="add-form__btn">Add Option</button>
      </form>
    )
  };
}

export default AddOption;