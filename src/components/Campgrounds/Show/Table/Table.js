import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
// import classes from './Table.css';

class Table extends Component {
  constructor(props) {
    super(props);
    this.delete = this.delete.bind(this);

    this.state = {
      redirect: false,
    };
  }
  delete() {
    const token = localStorage.getItem('token');

    axios
      .delete(
        'https://yelpcamp-node-api.herokuapp.com/campgrounds/' +
          this.props.obj._id,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(response => {
        this.setState({ redirect: true });
      })
      // .then(console.log('Deleted'))
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/campgrounds'} />;
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-9">
            <div className="thumbnail">
              <h2>More information about: {this.props.obj.name} campground!</h2>
              <img
                style={{ width: '100%' }}
                alt=""
                className="img-responsive"
                src={this.props.obj.image}
              />
              <div className="caption-full">
                <h4 className="pull-right">₦{this.props.obj.price} /Nigth</h4>
                <h4>{this.props.obj.name}</h4>
                <p>{this.props.obj.description}</p>

                {/* {this.props.userId === this.props.obj.owner && ( */}
                <p>
                  <Link
                    style={{ marginRight: '10px' }}
                    to={'/campgrounds/' + this.props.obj._id}
                    className="btn btn-success"
                  >
                    Edit
                  </Link>
                  <button onClick={this.delete} className="btn btn-danger">
                    Delete
                  </button>

                  <Link
                    style={{ marginRight: '5px' }}
                    to={'/campgrounds/'}
                    className="btn btn-success"
                  >
                    Go back
                  </Link>
                </p>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
