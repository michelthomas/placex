import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Images extends Component {
  render() {
    return (
      <div>
        <h1>Images!</h1>
        <div>
            <Link to="/">Home Page</Link>
        </div>
        <div>
            <Link to="/list">List Page</Link>
        </div>
      </div>
    );
  }
}
