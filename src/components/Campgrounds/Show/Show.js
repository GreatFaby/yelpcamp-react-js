import React, { Component } from 'react';
import axios from 'axios';
import Table from './Table/Table';

class Show extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campground: null,
      user: '',
    };
  }

  componentDidMount() {
    const authUser = JSON.parse(localStorage.getItem('user'));
    this.setState({ user: authUser });

    axios
      .get(
        'https://yelpcamp-node-api.herokuapp.com/campgrounds/' +
          this.props.match.params.id
      )
      .then(response => {
        this.setState({ campground: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  tabRow() {
    const { campground, user } = this.state;
    return (
      campground && (
        <Table
          obj={campground}
          userId={user && user._id}
          key={campground._id}
        />
      )
    );
  }

  render() {
    return <div className="container">{this.tabRow()}</div>;
  }
}

export default Show;
