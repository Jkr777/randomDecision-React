import React, { Component } from 'react';
import axios from 'axios';

class Form extends Component {
  state = {
    username: "",
    email: "",
    password: '',
  };
  
  handleChange = e => this.setState({ [e.target.name]: e.target.value });

  pick = (object, keys) => {
    return keys.reduce((obj, key) => {
      if (object[key]) obj[key] = object[key];
         return obj;
       }, {});
  }; 

  handleSubmit = e => {
    e.preventDefault();
    const data = this.pick(this.state, ["username", "email", "password"]);
    const endpoint = this.props.endpoint;

    if(this.props.endpoint === "edit"){
      this.props.handleUserEdit(data);
    } else {
    axios.post(endpoint, data)
      .then(res => {
        localStorage.setItem("auth-token", res.headers['x-auth']);
        this.props.handleAuth(res.data);
      })
      .catch(err => this.props.handleError(err.response.data));
    }
  };

  componentDidUpdate(prevProps){
    if(prevProps.match.url !== this.props.match.url) {
      this.props.handleRemoveError();
      this.setState({username: "", password: ''});
    };
  };

  render() {
    return (
      <div className="formContainer">
        <h1 className="homeTitle">{this.props.endpoint === "edit" ? "Edit your profile" : "What you should do next ? Let the computer decide for you!"}</h1>
        
        <form onSubmit={this.handleSubmit} className="form">
          {this.props.error ? <p className="form__error">{this.props.error}</p> : null}
          {this.props.endpoint === "register" || this.props.endpoint === "edit" ? 
          <input
            className="form__input"
            type="text"
            name="username"
            placeholder="Username"
            minLength="3"
            maxLength="255"
            onChange={this.handleChange}
          /> : null
          }
          <input
            className="form__input"
            type="email"
            name="email"
            placeholder="Email"
            minLength="3"
            maxLength="55"
            onChange={this.handleChange}
          />
          <input 
            className="form__input"
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Password"
            minLength="3"
            maxLength="255"
            onChange={this.handleChange}
          />
          <button className="form__button">{this.props.endpoint}</button>
          {this.props.endpoint === "edit" ? 
            <React.Fragment>
              <input className="form__button" type="button" value="Back" onClick={() => this.props.history.push("/boring_app")}/>
              <input className="form__button" type="button" value="Delete Your Account" onClick={() => this.props.handleDeleteUser()}/>
            </React.Fragment>
        : null}
        </form>
      </div>
    );
  }
}

export default Form;