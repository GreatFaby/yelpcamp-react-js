import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';

import NavigationItem from './NavigationItem/NavigationItem';

// import Dot from '../../../containers/Logout/Logout';

const navigationItems = props => (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <BrowserRouter>
          <Link className="navbar-brand" to="/">
            YelpCamp
          </Link>
        </BrowserRouter>
      </div>
      <div className="collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <NavigationItem link="/campgrounds">Campgrounds</NavigationItem>
          <NavigationItem link="/login">Login</NavigationItem>
          <NavigationItem link="/register">Sign Up</NavigationItem>
        </ul>
      </div>
    </div>
  </nav>
);

export default navigationItems;
