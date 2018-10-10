import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

export default class List extends Component {
  render() {
    return (
      <body id="LoginForm">
        <div class="container">
          <div class="login-form">
            <div class="main-div">
                <div class="home">
                    <div class="panel">
                        <h2>List</h2>
                            &ensp;
                        <Link to="/map">Map Page</Link>                        
                    </div>

                    <br/>

                    <div class="btn-group">
                      <Link to="/home">Home Page</Link>
                          &emsp;
                      <Link to="/images">Images Page</Link>
                          &ensp;
                      <Link to="/map">Map Page</Link>                      
                    </div>
                </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
