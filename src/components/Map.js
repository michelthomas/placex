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

        }
    }

    addCategory() {
        const category = {
            tipo: 'Parque'
        };

        const db = firebase.firestore();
        const userRef = db.collection('Category').add(category)
            .then(sucesso => {
                console.log('Dados inseridos: ' + sucesso);
            });
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

        db.collection('Categorias').get().then((querySnapshot) => {
            const categorias = [];
            querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());

                    const {nome} = doc.data();

                    categorias.push({
                        key: doc.id,
                        nome: nome,
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

    _altCheck = () => {
        console.log(this.state.categorias.key);
    };

    render() {
        // const style = {
        //   width: '50vw',
        //   height: '50vh',
        //   position: 'absolute',
        // };
        return (
          <div className='box'>
          <div>
          <div className='edition '>
          {this.state.categorias.map((cat, i) => {
                  return (

                      <div>
                          <label key={cat.key}>
                              <input type='checkbox' defaultChecked={cat.check} name={cat.nome} id={i} onChange={this._queryCoord}/>
                              {cat.nome}
                          </label>
                      </div>

                  )
              }
          )}
            </div>
          </div>
          <button onClick={this.addCategory} type="submit" class="btn-danger btnFixo">!</button>
              {/*<span>{this.state.categorias.get('1')}</span>*/}
            <div className='google-map'>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    bootstrapURLKeys={
                        {key: 'AIzaSyDWc-bIxXW2k_6OEWmHw3Ybf4hHkNqCiBQ'}
                    }>

                    {this.state.places.map((place, i) => {
                        this.state.categorias.map((cat) => {
                            console.log(place.categoria + ' ... ' + cat.key + ' ... ' + cat.check);
                            if (cat.check) {
                                console.log("passou");
                                return (

                                    <AnyReactComponent
                                        lat={place.coords.lat}
                                        lng={place.coords.long}
                                        onChildClick={place.descricao}
                                        hover={place.desc}
                                        title={place.nome}
                                    />
                                )
                            }
                        })

                    })}

                </GoogleMapReact>
            </div>
        </div>
        );
    }
}
const AnyReactComponent = ({text}) => <div><img src={marker}/></div>;