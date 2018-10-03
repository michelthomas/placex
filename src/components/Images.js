import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default class Images extends Component {
  render() {
    return (
      <div class="container">
        <div class="login-form">
          <div class="main-div">
              <div class="panel">
                  <h2>Images</h2>
              </div>
          
              <div>
                  <div class="btn-group">
                      <Link to="/">Home Page</Link>
                          &emsp;
                      <Link to="/list">List Page</Link>
                  </div>
                  
                  <br/>                   
              </div>                                                         
            </div>
          </div>
      </div>
    );
  }
}
