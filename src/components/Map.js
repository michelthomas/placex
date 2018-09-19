import React, { Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Image from 'react';

import marker from '../assets/baseline_place_black_18dp.png';

export default class Map extends Component {
  static defaultProps = {
      center: {lat: -9.665036, lng: -35.731161},
      zoom: 15,
      places: [{
          lat: -9.664464,
          lng: -35.732242
      }, {
          lat: -9.665634,
          lng: -35.730389
      }, {
          lat: -9.665345,
          lng: -35.735524
      }]
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
                defaultZoom={ this.props.zoom }
                bootstrapURLKeys={
                    {key: 'AIzaSyDWc-bIxXW2k_6OEWmHw3Ybf4hHkNqCiBQ'}
                }>

                {this.props.places.map( (place) =>{
                    return(
                    <AnyReactComponent
                        lat={place.lat}
                        lng={place.lng}
                        text={'Kreyser Avrora'}
                    />
                )})}

            </GoogleMapReact>
        </div>
    );
  }
}
const AnyReactComponent = ({ text }) => <div><img src={marker}/></div>;