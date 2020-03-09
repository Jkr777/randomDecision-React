import React from 'react';
import {ReactComponent as Menu} from '../images/icon_menu.svg';

const MenuIcon = props => (
  <div className="navigation__right--icon" onClick={props.handleMenuOpen}>
    <Menu />
  </div>
);

export default MenuIcon;