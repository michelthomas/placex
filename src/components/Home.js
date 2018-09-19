import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);

    var currentUser = firebase.auth().currentUser;
    if (!currentUser){
      this.props.history.push('/');
    }
  }
  
  logout(){
    firebase.auth().signOut();
    this.props.history.push('/');
  }

  addPlace(){
    var place = {
      description: 'Parque Munincipal',
      price: 'gratuito',
      openHours: '08:00 - 18:00',
      likes: 624
    };

    firebase.database().ref('places').push(place)
    .then(sucesso => {
      console.log('Dados inseridos: ' + sucesso);
    });
  }

  listPlaces(){
    var ref = firebase.database().ref('places');

    ref.once('value', function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        console.log(childSnapshot.val());
      })
    });

  }
  
  render() {
    return (
      <div>
        <h1>Home!</h1>
        <div>
            <Link to="/list">List Page</Link>
        </div>
        <div>
            <Link to="/images">Images Page</Link>
        </div>
        <br/>
        <a onClick={this.addPlace}>Cadastrar Local</a>
        <br/>
        <a onClick={this.listPlaces}>Listar Locais</a>
        <br/>
        <a onClick={this.logout}>Logout</a>
      </div>
    );
  }
}
