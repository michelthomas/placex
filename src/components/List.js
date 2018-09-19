import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class List extends Component {
  render() {
    return (
      <div>
        <h1>List!</h1>
        <div>
            <Link to="/">Home Page</Link>
        </div>
        <div>
            <Link to="/images">Images Page</Link>
        </div>
      </div>
    );
  }
}
