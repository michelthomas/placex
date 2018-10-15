import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
//import Image from 'react';
import marker from '../assets/baseline_place_black_18dp.png';
import firebase from 'firebase';

//import bootstrap
import { Button } from 'reactstrap';

export default class Places extends Component {

    constructor() {
        super();
        this.state = {
            placeName: [],
        }
        this.upgradePlace = this.upgradePlace.bind(this);
    }

    upgradePlace(event){
        this.setState({placeName: event.target.value});
    }

    addPlace  = ev =>  {
        const category = {
            tipo: this.state.placeName,
        };

        const db = firebase.firestore();
        const userRef = db.collection('Places').add(category)
            .then(sucesso => {
                console.log('Dados inseridos: ' + sucesso);
            });
    }

  render() {
    return (
      <body id="LoginForm">
        <div class="container">
          <div class="login-form">
            <div class="main-div">
                <div class="home">
                    <input
                      className="form-control form-control-lg"
                      value={this.state.categoryName}
                      type="text"
                      placeholder="Category Name"
                      onChange={this.upgradeCategory} />

                      <br/>

                      <button onClick={this.addPlace} type="submit" class="btn btn-danger">Register</button>                  
                </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
