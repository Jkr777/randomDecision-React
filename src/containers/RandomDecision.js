import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { setTokenHeader } from '../services/axios';
import Header from '../components/Header';
import Form  from './Form.js';
import Options from '../components/Options';
import SelectOption from '../components/SelectOption';
import AddOption from './AddOption';
import BackgrowndModal from '../components/BackgrowndModal';
import OptionModal from '../components/OptionModal';

class RandomDecision extends Component {
  state = {
    auth: false,
    error: false,
    spinning: false,
    selectedOption: null,
    menuOpen: false,
    user: {options: []} 
  };

  handleAuth = data => {
    setTokenHeader(localStorage.getItem("auth-token"));
    this.setState({user: data, auth: true});
  };

  handleError = err => {
    this.setState({ error: err });
  };

  handleRemoveError = () => {
    this.setState({ error: false });
  };

  handleAddOption = data => {
    this.setState({ spinning: true });
    axios.post("/profile/option", data)
      .then(res => {
        this.setState(prevState => ({spinning: false, user: {...prevState.user, options: [...prevState.user.options, res.data]}}))
      })
      .catch(err => this.setState({spinning: false, error: err.response.data}));
  };

  handleSelectOption = () => {
    const num = this.state.user.options.length;
    const rand = Math.floor(Math.random() * num);

    this.setState({selectedOption: this.state.user.options[rand].text, error: false});
  };

  handleModal = () => {
    this.setState({ selectedOption: null });
  };

  handleReset = () => {
    axios.delete('/profile/option')
      .then(() => {
        this.setState(prevState => ({ error: false, user: {...prevState.user, options: []} }))
      })
      .catch(err => this.setState({ error: err.response.data }))
  };

  handleRemoveOption = data => {
    axios.delete(`/profile/option/${data}`)
      .then(() => {
        this.setState(prevState => ({ error: false, user: {...prevState.user, options: prevState.user.options.filter(option => option._id !== data)} }))
      })
      .catch(err => this.setState({error: err.response.data}))
  };

  handleLogOut = () => {
    this.setState({    
      auth: false,
      error: false,
      spinning: false,
      selectedOption: null,
      menuOpen: false,
      user: {options: []} });
    localStorage.removeItem("auth-token");
  };

  handleDeleteUser = () => {
    axios.delete("/profile")
      .then(() => {
        this.setState({    
          auth: false,
          error: false,
          spinning: false,
          selectedOption: null,
          menuOpen: false,
          user: {options: []} });
      })
      .catch(err => this.setState({error: err.response.data}));
    localStorage.removeItem("auth-token");
  };

  handleUserEdit = data => {
    axios.patch("/profile", data)
      .then(res => this.setState(prevState => ({user: {...prevState.user, ...res.data}})))
      .catch(err => this.setState({error: err.response.data}));
  };

  handleMenuOpen = () => this.setState(prevState => ({ menuOpen: !prevState.menuOpen }));

  componentDidMount() {
    if(localStorage.getItem("auth-token")) {   
      setTokenHeader(localStorage.getItem("auth-token"));
      axios.get("/profile")
        .then(res => {
          this.handleAuth(res.data);
        })
        .catch(() => this.handleLogOut());
    }
  };

  render() {
    return (
      <BrowserRouter>
          <Header 
            auth={this.state.auth} 
            user={this.state.user.username} 
            handleLogOut={this.handleLogOut}
            handleMenuOpen={this.handleMenuOpen}
            menuClicked={this.state.menuOpen}
          />
          <Switch>
            <Route path="/register" render={props => localStorage.getItem("auth-token") && this.state.auth ? <Redirect to="/boring_app" /> : <Form 
              endpoint="register" 
              handleAuth={this.handleAuth} 
              handleError={this.handleError} 
              handleRemoveError={this.handleRemoveError} 
              error={this.state.error} 
              {...props}/> } 
              exact 
            />
            <Route path="/login" render={props => localStorage.getItem("auth-token") && this.state.auth ? <Redirect to="/boring_app" /> : <Form 
              endpoint="login" 
              handleAuth={this.handleAuth} 
              handleError={this.handleError} 
              handleRemoveError={this.handleRemoveError}  
              error={this.state.error}  
              {...props}/> } 
              exact 
            />
            <Route path="/boring_app" render={() => localStorage.getItem("auth-token") && this.state.auth ?
              <section className="container">
              {this.state.error ? <p className="error">{this.state.error}</p> : null}
              <BackgrowndModal 
                selectedOption={this.state.selectedOption}
                handleModal={this.handleModal}
              />
              <OptionModal 
                handleModal={this.handleModal}
                selectedOption={this.state.selectedOption}
              />
              <SelectOption
                handleSelectOption={this.handleSelectOption}
                options={this.state.user.options}
              />
              <Options
                handleReset={this.handleReset}
                spinner={this.state.spinning} 
                handleRemoveOption={this.handleRemoveOption}
                options={this.state.user.options}
              />
              <AddOption 
                handleAddOption={this.handleAddOption} 
                handleRemoveError={this.handleRemoveError}      
              />
            </section>
            :
            <Redirect to="/register" />
          } exact/>

            <Route path="/profile" render={props => localStorage.getItem("auth-token") && this.state.auth ? <Form 
              endpoint="edit" {...props} 
              handleDeleteUser={this.handleDeleteUser}
              handleUserEdit={this.handleUserEdit} /> : <Redirect to="/register" />} 
              exact
            />
            <Redirect from="/" to="/register" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default RandomDecision;