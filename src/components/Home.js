import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import firebase from 'firebase';
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
          modalp: false,
          modalc: false,
          placeName: [],
          categoryName: [],
        };

        this.upgradePlace = this.upgradePlace.bind(this);
        this.upgradeCategory = this.upgradeCategory.bind(this);
        this.togglep = this.togglep.bind(this);
        this.togglec = this.togglec.bind(this);
        this.logout = this.logout.bind(this);

        const currentUser = firebase.auth().currentUser;
        if (!currentUser) {
            this.props.history.push('/');
        }
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

    togglep() {
      this.setState({
        modalp: !this.state.modalp
     });
    }

    togglec() {
      this.setState({
        modalc: !this.state.modalc
     });
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
            <AppBar position="static" color="default">
              <Toolbar>
                <Button color="inherit" onClick={this.addPlace} type="submit">Register a place</Button>
                <Button color="inherit" onClick={this.togglec} type="text">New Category</Button>
                <Button color="inherit" onClick={this.togglep} type="text">New Place</Button>
                <Button color="inherit" href="/map" type="text">List places</Button>
                <Button color="inherit" onClick={this.logout} type="submit">Logout</Button>
              </Toolbar>
            </AppBar>

            <Modal isOpen={this.state.modalp} toggle={this.togglep} className={this.props.className}> {/*Modal de cadastrar lugares*/}
              <ModalHeader toggle={this.togglep}>Modal title</ModalHeader>
              <ModalBody>
                <input
                  className="form-control form-control-lg"
                  value={this.state.placeName}
                  type="text"
                  placeholder="Place"
                  onChange={this.upgradePlace} />          
              </ModalBody>
              <ModalFooter>
                <button class="btn btn-info">Cancel</button>          
                <button onClick={this.addPlace} type="submit" class="btn btn-info">Register</button>
              </ModalFooter>
            </Modal>

            <Modal isOpen={this.state.modalc} toggle={this.togglec} className={this.props.className}> {/*Modal de cadastrar categorias*/}
              <ModalHeader toggle={this.togglec}>Modal title</ModalHeader>
              <ModalBody>
                <input
                  className="form-control form-control-lg"
                  value={this.state.categoryName}
                  type="text"
                  placeholder="Category"
                  onChange={this.upgradeCategory} />          
              </ModalBody>
              <ModalFooter>
                <button class="btn btn-info">Cancel</button>          
                <button onClick={this.addCategory} type="submit" class="btn btn-info">Register</button>
              </ModalFooter>
            </Modal>                  
          </div>
        );
    }
}
