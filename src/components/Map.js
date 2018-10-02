import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Image from 'react';
import marker from '../assets/baseline_place_black_18dp.png';
import firebase from 'firebase';

export default class Map extends Component {
    constructor() {
        super();
        this.state = {
            places: [],
        }
    }

    componentDidMount() {
        firebase.firestore().collection('Places').get().then((querySnapshot) => {
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

    }

    static defaultProps = {
        center: {lat: -9.665036, lng: -35.731161},
        zoom: 15,
    };


    render() {
        const style = {
            width: '100vw',
            height: '100vh'
        };
        return (
            <div className='google-map' style={style}>
                <GoogleMapReact
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    bootstrapURLKeys={
                        {key: 'AIzaSyDWc-bIxXW2k_6OEWmHw3Ybf4hHkNqCiBQ'}
                    }>

                    {this.state.places.map((place) => {
                        return (
                            <AnyReactComponent
                                lat={place.coords.lat}
                                lng={place.coords.long}
                                text={'Kreyser Avrora'}
                                onChildClick={place.descricao}
                                hover={place.desc}
                            />
                        )
                    })}

                </GoogleMapReact>
            </div>
        );
    }
}
const AnyReactComponent = ({text}) => <div><img src={marker}/></div>;