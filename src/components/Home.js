import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import { Button } from 'reactstrap';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);

        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            this.props.history.push('/');
        }
    }

    logout() {
        firebase.auth().signOut();
        this.props.history.push('/');
    }

    addPlace() {
        const place = {
            description: 'Parque Munincipal',
            price: 'gratuito',
            openHours: '08:00 - 18:00',
            likes: 624
        };

        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });
        const userRef = db.collection('Places').add(place)
            .then(sucesso => {
                console.log('Dados inseridos: ' + sucesso);
            });
    }

    listPlaces() {
        var ref = firebase.database().ref('places');

        ref.once('value', function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
                console.log(childSnapshot.val());
            })
        });

    }

    render() {
        return (
            <div class="container">
              <div class="login-form">
                <div class="main-div">
                    <div class="panel">
                        <h2>Home</h2>
                    </div>
                
                    <div>
                        <div class="btn-group">
                            <Link to="/list">List Page</Link>
                                &emsp;
                            <Link to="/images">Images Page</Link>
                        </div>

                        <br/>
                        <br/>

                        <div class="btn-group">
                            <Button onClick={this.addPlace} disabled>Cadastrar local</Button>
                            
                            <Button onClick={this.listPlaces}>Listar Locais</Button>
                            
                            <Button color="dark" onClick={this.logout}>Sair</Button>
                        </div>                    
                    </div>                                                         
                  </div>
                </div>
            </div>
        );
    }
}
