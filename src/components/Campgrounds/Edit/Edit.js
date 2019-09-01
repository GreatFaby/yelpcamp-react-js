import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      price: '',
      image: '',
      description: '',
      redirect: false,
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://yelpcamp-node-api.herokuapp.com/campgrounds/' +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({
          name: response.data.name,
          price: response.data.price,
          image: response.data.image,
          description: response.data.description,
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      price: this.state.price,
      image: this.state.image,
      description: this.state.description,
    };
    const token = localStorage.getItem('token');
    axios
      .patch(
        'http://localhost:4000/campgrounds/' + this.props.match.params.id,
        obj,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() =>
        this.props.history.push(
          '/campgrounds/' + this.props.match.params.id + '/show'
        )
      );
    // this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/campgrounds" />;
    }

    return (
      <div className="container">
        <h3 align="center">Edit {this.state.name}</h3>
        <div style={{ width: '60%', margin: '25px auto' }}>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control"
                value={this.state.name}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="price"
                className="form-control"
                value={this.state.price}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="image"
                className="form-control"
                value={this.state.image}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="description"
                className="form-control"
                value={this.state.description}
                onChange={this.onChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" value="Submit" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
