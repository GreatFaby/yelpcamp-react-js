import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classes from './Body.css';

class Body extends Component {
  render() {
    // const token = localStorage.getItem('token');
    // if (!token)
    return (
      <div className="col-md-3 col-sm-6">
        <div className={classes.thumbnail}>
          <img className={classes.img} alt="" src={this.props.obj.image} />
          <div className={classes.caption}>
            <h4>{this.props.obj.name}</h4>
          </div>

          <p>
            <Link
              to={'/campgrounds/' + this.props.obj._id + '/show'}
              className="btn btn-primary"
            >
              More info
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default Body;
