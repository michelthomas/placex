import React, { Component } from 'react';
import firebase from 'firebase';
import { Button } from 'reactstrap';

export default class Login extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
        email: '',
        senha: ''
    };

    this.loginUsuario = this.loginUsuario.bind(this);
    this.cadastrarUsuario = this.cadastrarUsuario.bind(this);
    this.atualizarEmail = this.atualizarEmail.bind(this);
    this.atualizarSenha = this.atualizarSenha.bind(this);

  }

  atualizarEmail(event){
    this.setState({email: event.target.value});
  }

  atualizarSenha(event){
    this.setState({senha: event.target.value});
  }

  cadastrarUsuario(){
    firebase.auth().createUserWithEmailAndPassword(
      this.state.email,
      this.state.senha
    )
    .then(sucesso => {
      alert('Usuário cadastrado com sucesso!');
    })
    .catch(erro => {
      alert(erro);
    });
  }

  loginUsuario(){
    firebase.auth().signInWithEmailAndPassword(
      this.state.email,
      this.state.senha
    )
    .then(sucesso => {
      this.props.history.push('/home');
    })
    .catch(erro => {
      alert(erro);
    });
  }

  render() {
    return (
      <body id="LoginForm">
        <div class="container">
          <div class="login-form">
            <div class="main-div">

              <div class="panel">
               <h2>PlacEx</h2>
               <p>Por favor insira seu email e senha</p>
              </div>

              <div class="form-group">
                  <input type="text" name="email" class="form-control"
                            value={this.state.email} onChange={this.atualizarEmail} id="inputEmail" placeholder="Email" />
              </div>

              <div class="form-group">
                  <input type="password" name="senha" class="form-control"
                            value={this.state.senha} onChange={this.atualizarSenha} id="inputPassword" placeholder="Senha" />
              </div>

              <br/>

              <button onClick={this.cadastrarUsuario} type="submit" class="btn btn-primary">Cadastrar</button>
                &emsp;
              <button onClick={this.loginUsuario} type="submit" class="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </body>




      /*
      <div class="container">
        <h1>Login!</h1>
        <div>
            <label>
                Email:
                <input type="text" name="email"
                    value={this.state.email} onChange={this.atualizarEmail}/>
            </label>
        </div>
        <div>
            <label>
                Senha:
                <input type="password" name="senha"
                    value={this.state.senha} onChange={this.atualizarSenha}/>
            </label>
        </div>
        <div class="btn-group">
          <Button onClick={this.cadastrarUsuario}>Cadastrar</Button>
            &emsp;
          <Button onClick={this.loginUsuario} color="dark">Login</Button>
        </div>
      </div>*/
    );

  }
}
