import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class newCampground extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      price: '',
      image: '',
      description: '',
      redirect: false,
    };
  }

  handleNameChange = event => {
    this.setState({
      name: event.target.value,
    });
  };

  handlePriceChange = event => {
    this.setState({
      price: event.target.value,
    });
  };

  handleImageChange = event => {
    this.setState({
      image: event.target.value,
    });
  };

  handleDescriptionChange = event => {
    this.setState({
      description: event.target.value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      name: this.state.name,
      price: this.state.price,
      image: this.state.image,
      description: this.state.description,
    };
    const token = localStorage.getItem('token');
    console.log(token);
    axios
      .post('https://yelpcamp-node-api.herokuapp.com/campgrounds', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        this.setState({ redirect: true });
        console.log(response.data);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={'/campgrounds'} />;
    }

    if (!localStorage.getItem('token')) {
      return <Redirect to={'/campgrounds'} />;
    }

    return (
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>Create a New Campground</h1>
        <div style={{ width: '60%', margin: '25px auto' }}>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="name"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="price"
                value={this.state.price}
                onChange={this.handlePriceChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="image"
                value={this.state.image}
                onChange={this.handleImageChange}
              />
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                placeholder="description"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              />
            </div>
            <div className="form-group">
              <button
                className="btn btn-lg btn-primary btn-block"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default newCampground;
