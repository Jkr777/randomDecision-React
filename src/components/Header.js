import React from 'react';
import { NavLink } from 'react-router-dom';
import {ReactComponent as Logo} from '../images/logo.svg';
import MenuIcon from './MenuIcon';

const Header = props => (
  <header className="header">
    <nav className="navigation">
      <div className="navigation__left">
        <Logo />
        <span className="navigation__left-name">Random Decision</span>
      </div>
      {props.auth ? 
      <React.Fragment>
        <MenuIcon 
          handleMenuOpen={props.handleMenuOpen}
        />
        
        <div className={props.menuClicked ? "navigation__right--menu-open" : "navigation__right"}>
          <NavLink className="navigation__username navigation--link" to="/profile" activeClassName="navigation--link--active">{props.user}</NavLink>
          <NavLink className="navigation--link" to="/" onClick={props.handleLogOut}>Logout</NavLink>
        </div>
      </React.Fragment>
      :
      <React.Fragment>
        <MenuIcon 
          handleMenuOpen={props.handleMenuOpen}
        />
        <div className={props.menuClicked ? "navigation__right--menu-open" : "navigation__right"}>
          <NavLink className="navigation--link" to="/register" activeClassName="navigation--link--active" >Register</NavLink>
          <NavLink className="navigation--link" to="/login" activeClassName="navigation--link--active" >Login</NavLink>
        </div> 
      </React.Fragment>
    }  
    </nav>
  </header>
);

export default Header;