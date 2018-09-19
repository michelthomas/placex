import React, { Component } from 'react';
import './App.css';
import Home from './components/Home';
import Images from './components/Images';
import List from './components/List';
import Map from './components/Map';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDbbbhPTyFFH5AU4XgHiUo_vPYNVtGl6Vk",
    authDomain: "placex3mla.firebaseapp.com",
    databaseURL: "https://placex3mla.firebaseio.com",
    projectId: "placex3mla",
    storageBucket: "placex3mla.appspot.com",
    messagingSenderId: "844288218995"
};
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Login} />
          <Route path="/home" component={Home} />
          <Route path="/images" component={Images} />
          <Route path="/list" component={List} />
          <Route path="/map" component={Map} />
        </div>
      </Router>
    );
  }
}

export default App;
