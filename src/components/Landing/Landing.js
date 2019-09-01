import React from 'react';
import { Link } from 'react-router-dom';

import classes from './Landing.css';

const Landing = props => {
  return (
    <div className={classes.londing}>
      <div>
        <h1>Welcome to YelpCamp!</h1>
        <Link className="btn btn-lg btn-success" to="/campgrounds">
          View All Campgrounds
        </Link>
      </div>

      {/* <ul className={classes.slideshow}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul> */}
    </div>
  );
};

export default Landing;
