import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
//import Image from 'react';
import marker from '../assets/baseline_place_black_18dp.png';
import firebase from 'firebase';
//import bootstrap
import { Button } from 'reactstrap';

export default class Category extends Component {

    constructor() {
        super();
        this.state = {
            categoryName: [],
        }
        this.upgradeCategory = this.upgradeCategory.bind(this);
    }

    upgradeCategory(event){
        this.setState({categoryName: event.target.value});
    }

    addCategory  = ev =>  {
        const category = {
            tipo: this.state.categoryName,
        };

        const db = firebase.firestore();
        const userRef = db.collection('Category').add(category)
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

                      <a type="text" href="/map" class="btn btn-secondary btnReturn">Return</a>
                      &emsp;
                      <button onClick={this.addCategory} type="submit" class="btn btn-info">Register</button>                  
                </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
