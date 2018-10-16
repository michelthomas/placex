import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
//import Image from 'react';
import marker from '../assets/baseline_place_black_18dp.png';
import firebase from 'firebase';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

//import navbar home
import Home from './Home';

export default class Map extends Component {
    constructor() {
        super();
        this.state = {
            places: [],
            categorias: [],
            checkSelecionados: [],

            modalp: false,
            modalc: false,

            placeName: [],
            placePrice: [],
            placeHours: [],
            placeLat: [],
            placeLong: [],
            placeCategory: [],
            categoryName: [],
        };

        this.upgradePlace = this.upgradePlace.bind(this);
        this.upgradePlacePrice = this.upgradePlacePrice.bind(this);
        this.upgradePlaceHours = this.upgradePlaceHours.bind(this);
        this.upgradePlaceLat = this.upgradePlaceLat.bind(this);
        this.upgradePlaceLong = this.upgradePlaceLong.bind(this);
        this.upgradeCategory = this.upgradeCategory.bind(this);
        this.togglep = this.togglep.bind(this);
        this.togglec = this.togglec.bind(this);
        this.logout = this.logout.bind(this);
    }

    upgradePlace(event) {
        this.setState({placeName: event.target.value});
    }

    upgradePlacePrice(event) {
        this.setState({placePrice: event.target.value});
    }

    upgradePlaceHours(event) {
        this.setState({placeHours: event.target.value});
    }

    upgradePlaceLat(event) {
        this.setState({placeLat: event.target.value});
    }

    upgradePlaceLong(event) {
        this.setState({placeLong: event.target.value});
    }

    // upgradePlaceCategory(event) {
    //     this.setState({placeCategory: event.target.value});
    // }

    upgradeCategory(event) {
        this.setState({categoryName: event.target.value});
    }

    addPlace = ev => {
        const place = {
            description: this.state.placeName,
            price: this.state.placePrice,
            openHours: this.state.placeHours,
            lat: this.state.placeLat,
            long: this.state.placeLong,
            category: this.state.placeCategory,
        };

        const db = firebase.firestore();
        const userRef = db.collection('Places').add(place)
            .then(sucesso => {
                console.log('Dados inseridos: ' + sucesso);

                window.location.reload()
            });
        this.togglep()
    };

    addCategory = ev => {
        const category = {
            tipo: this.state.categoryName,
        };

        const db = firebase.firestore();
        const userRef = db.collection('Category').add(category)
            .then(sucesso => {
                console.log('Dados inseridos: ' + sucesso);

                window.location.reload()
            });
        this.togglec()

    };

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

    componentDidMount() {
        const db = firebase.firestore();
        const settings = { timestampsInSnapshots: true};
        db.settings(settings);

        db.collection('Places').get().then((querySnapshot) => {
            const places = [];
            querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    const {category, description, lat, long, openHours, price} = doc.data();

                    places.push({
                        categoria: category,
                        lat:lat,
                        long: long,
                        openHours: openHours,
                        nome: description,
                        price: price,
                    });


                }
            );

            this.setState({
                places: places,
            });
        }).catch((error) => {
            console.error(error);
        });

        db.collection('Category').get().then((querySnapshot) => {
            const categorias = [];
            querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    const {tipo} = doc.data();

                    categorias.push({
                        tipo: tipo,
                        check: true
                    });


                }
            );

            this.setState({
                categorias: categorias,
            });
        }).catch((error) => {
            console.error(error);
        });

    }


    _handleInputChange = event => {
        const id = event.target.id;
        console.log(id);
    };

    static defaultProps = {
        center: {lat: -9.665036, lng: -35.731161},
        zoom: 14,
    };


    render() {
        return (
            <div className='box'>

                <div className='edition '>
                    <AppBar position="static" color="inherit">
                        <Toolbar>
                            <Button color="inherit" onClick={this.togglec} type="text">New Category</Button>
                            <Button color="inherit" onClick={this.togglep} type="text">New Place</Button>
                            <Button color="inherit" /*onClick={this.listPlaces}*/ href="/map" type="submit">List
                                places</Button>
                            <Button color="inherit" onClick={this.logout} type="submit">Logout</Button>
                        </Toolbar>
                    </AppBar>

                    <br/>

                    <div>
                        {this.state.categorias.map((cat, i) => {
                                return (
                                    <div>
                                        &ensp;
                                        <label>
                                            <input type='checkbox' defaultChecked={true} name={cat.tipo} id={i}
                                                   onChange={this._handleInputChange}/>
                                            {cat.tipo}
                                        </label>
                                    </div>

                                )
                            }
                        )}
                    </div>
                </div>

                <div className='google-map'>
                    <GoogleMapReact
                        defaultCenter={this.props.center}
                        defaultZoom={this.props.zoom}
                        bootstrapURLKeys={
                            {key: 'AIzaSyDWc-bIxXW2k_6OEWmHw3Ybf4hHkNqCiBQ'}
                        }>

                        {

                            this.state.places.map((place, i) => {
                                let passar;

                                this.state.categorias.map((categoria, j) => {
                                    console.log(place.categoria + ' ... ' + categoria.tipo + '...' + categoria.check);
                                    if ((place.categoria == categoria.tipo) && categoria.check == true) {
                                        passar = 1;
                                        console.log('pass')
                                    }
                                });

                                if (passar == 1) {
                                    return (

                                        <AnyReactComponent
                                            lat={place.lat}
                                            lng={place.long}
                                            onChildClick={place.nome}
                                            hover={place.nome}
                                            title={place.nome}
                                        />
                                    )
                                } else {
                                    console.log('n passou')
                                }
                                passar = 0;

                            })}

                    </GoogleMapReact>
                </div>

                <Modal isOpen={this.state.modalp} toggle={this.togglep}
                       className={this.props.className}> {/*Modal de cadastrar lugares*/}
                    <ModalHeader toggle={this.togglep}>Register a place</ModalHeader>
                    <ModalBody>
                        <input
                            className="form-control form-control-lg"
                            value={this.state.placeName}
                            type="text"
                            placeholder="Name"
                            onChange={this.upgradePlace}/>

                        <br/>

                        <input
                            className="form-control form-control-lg"
                            value={this.state.placePrice}
                            type="number"
                            placeholder="Price (R$)"
                            onChange={this.upgradePlacePrice}/>

                        <br/>

                        <input
                            className="form-control form-control-lg"
                            value={this.state.placeHours}
                            type="text"
                            placeholder="Place hours"
                            onChange={this.upgradePlaceHours}/>

                        <br/>

                        <input
                            className="form-control form-control-lg"
                            value={this.state.placeLat}
                            type="number"
                            placeholder="Place lat"
                            onChange={this.upgradePlaceLat}/>

                        <br/>

                        <input
                            className="form-control form-control-lg"
                            value={this.state.placeLong}
                            type="number"
                            placeholder="Place long"
                            onChange={this.upgradePlaceLong}/>
                    </ModalBody>
                    <select onChange={(e) => this.setState({ value: e.target.value })}>
                        <option>Selecione a categoria</option>
                        {this.state.categorias.map((cat, i) => {
                                return (
                                    <option value={cat.tipo} >{cat.tipo}</option>
                                )
                            }
                        )
                        }
                    </select>
                    <ModalFooter>
                        <button onClick={this.addPlace} type="submit" className="btn btn-info">Register</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalc} toggle={this.togglec}
                       className={this.props.className}> {/*Modal de cadastrar categorias*/}
                    <ModalHeader toggle={this.togglec}>Register a category</ModalHeader>
                    <ModalBody>
                        <input
                            className="form-control form-control-lg"
                            value={this.state.categoryName}
                            type="text"
                            placeholder="Category name"
                            onChange={this.upgradeCategory}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.addCategory} className="btn btn-info">Register</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
const AnyReactComponent = ({text}) => <div><img src={marker}/></div>;
