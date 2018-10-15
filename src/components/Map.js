import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
//import Image from 'react';
import marker from '../assets/baseline_place_black_18dp.png';
import firebase from 'firebase';

//import bootstrap
import { Button } from 'reactstrap';

export default class Map extends Component {
    constructor() {
        super();
        this.state = {
            places: [],
            categorias: [],
            checkSelecionados:[],
        }
    }


    componentDidMount() {
        const db = firebase.firestore();
        db.collection('Places').get().then((querySnapshot) => {
            const places = [];
            querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    const {categoria, coords, nome, descricao} = doc.data();

                    places.push({
                        key: doc.id,
                        categoria: categoria,
                        coords: coords,
                        nome: nome,
                        descricao: descricao,
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

    static defaultProps = {
        center: {lat: -9.665036, lng: -35.731161},
        zoom: 15,
    };

    _handleInputChange = event => {
        const id = event.target.id;
        console.log(id);
    };

    render() {
        // const style = {
        //   width: '50vw',
        //   height: '50vh',
        //   position: 'absolute',
        // };
        return (
          <div className='box'>
          <div className='edition '>
            <h5 class="card-header">PlacEx Map</h5>
            <br/>

            <div>
              {this.state.categorias.map((cat, i) => {
                  return (
                      <div>
                        &ensp;
                          <label>
                              <input type='checkbox' defaultChecked={true} name={cat.tipo} id={i} onChange={this._handleInputChange}/>
                              {cat.tipo}
                          </label>
                      </div>

                  )
              }
          )}
            </div>
          </div>

          <div class="btn-group">
            <label class="labelFixoCategory">C</label>
                <a type="text" href="/category" class="btnFixoCategory" title="Register a new category">+</a>
            <label class="labelFixoPlace">P</label>
                <a type="text" href="/places" class="btnFixoPlace" title="Register a new place">+</a>
          </div>
       

              {/*<span>{this.state.categorias.get('1')}</span>*/}
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
                                        lat={place.coords.lat}
                                        lng={place.coords.long}
                                        onChildClick={place.descricao}
                                        hover={place.desc}
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
        </div>
        );
    }
}
const AnyReactComponent = ({text}) => <div><img src={marker}/></div>;
