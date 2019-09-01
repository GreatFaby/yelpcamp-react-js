import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import Body from './Body/Body';

class Campgrounds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campground: null,
      redirect: false,
    };
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://yelpcamp-node-api.herokuapp.com/campgrounds')
      .then(response => {
        console.log(response.data);
        this.setState({ campground: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });

    if (localStorage.getItem('token')) {
      console.log('Call User feed');
    } else {
      this.setState({ redirect: false });
    }
  }

  tabRow() {
    return (
      this.state.campground &&
      this.state.campground.map(function(object, i) {
        return <Body obj={object} key={i} />;
      })
    );
  }

  logout() {
    localStorage.setItem('token', '');
    localStorage.clear();
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/login'} />;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      return (
        <div className="container">
          <header className="jumbotron">
            <div className="container">
              <h1>Welcome To YelpCamp</h1>
              <p>View our hand picked campgrounds from all over the world</p>
              <p>
                <Link className="btn btn-primary btn-lg" to="/Register">
                  Add New Campground
                </Link>
              </p>
              <marquee behavior="alternate">
                To Add New Capground, Kindly Login or Register
              </marquee>
            </div>
          </header>

          <div
            className="row text-center"
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {this.tabRow()}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <header className="jumbotron">
            <div className="container">
              <button
                onClick={this.logout}
                className="pull-right btn btn-warning logout"
              >
                logout
              </button>
              <h1>Welcome To YelpCamp</h1>
              <p>View our hand picked campgrounds from all over the world</p>
              <p>
                <Link className="btn btn-primary btn-lg" to="/campgrounds/new">
                  Add New Campground
                </Link>
              </p>
            </div>
          </header>

          <div
            className="row text-center"
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            {this.tabRow()}
          </div>
        </div>
      );
    }
  }
}

export default Campgrounds;
