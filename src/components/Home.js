import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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
          <div>
          <AppBar position="static" color="inherit">
          <IconButton color="inherit" aria-label="Menu">
          <MenuIcon />
          </IconButton>
          <Toolbar>
              <Button color="inherit" onClick={this.addPlace} type="submit">Register a place</Button>
              <Button color="inherit" onClick={this.listPlaces} type="submit">List places</Button>
              <Button color="inherit" onClick={this.logout} type="submit">Logout</Button>
          </Toolbar>
          </AppBar>
          </div>
        );
    }
}
