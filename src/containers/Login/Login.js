import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      redirect: false,
    };
  }

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value,
    });
  };

  handlePasswordChange = event => {
    this.setState({
      password: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password,
    };
    axios
      .post('https://yelpcamp-node-api.herokuapp.com/login', data)
      .then(response => {
        console.log(response);
        if (response.data) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          this.setState({ redirect: true });
        } else {
          console.log('Login Error');
        }
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/campgrounds'} />;
    }

    if (localStorage.getItem('token')) {
      return <Redirect to={'/campgrounds'} />;
    }

    return (
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>Login</h1>
        <div style={{ width: '30%', margin: '25px auto' }}>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="username"
                value={this.state.username}
                onChange={this.handleUsernameChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
