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
        <div class="container">
          <div class="login-form">
            <div class="main-div">
                <div class="panel">
                 <h2>PlaceEx</h2>
                 <p>Por favor insira seu email e senha</p>
               </div>
               <div id="Login">
                  <div class="form-group">
                      <input type="text" name="email"
                          value={this.state.email} onChange={this.atualizarEmail} placeholder="Email" />
                  </div>

                  <div class="form-group">
                      <input type="password" name="senha"
                          value={this.state.senha} onChange={this.atualizarSenha} placeholder="Senha" />
                  </div>

                  <div class="btn-group">
                    <Button onClick={this.cadastrarUsuario}>Cadastrar</Button>
                      &emsp;
                    <Button onClick={this.loginUsuario} color="dark">Login</Button>
                  </div>
                </div>                                                            
              </div>
            </div>
          </div>




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
