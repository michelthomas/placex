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
          categoryName:'',
          checkSelecionados:[]
      }
  }

  addCategory() {
      const category = {
          tipo: this.state.categoryName,
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

          <input type="text" onChange={this.upgradeCategory} class="categoryName form-control" value={this.state.categoryName} placeholder="Category Name"  title="Insert the name of category" />

          <br/>
          <br/>
          &ensp;
          <div className='btn-group'>
          </div>
        </div>
        <button onClick={this.addCategory} type="submit" class="btn-danger btnFixo">Cadastrar categoria</button>
          </div>
      </div>
      );
  }

}
