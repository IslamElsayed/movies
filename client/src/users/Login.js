import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Header from '../Header'

class Login extends Component {
  constructor(props) {
      super(props);

      this.state = {
        email: "",
        password: "",
        error: ""
      };
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
    }

    validateForm() {
      return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleEmailChange(event) {
       this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
       this.setState({password: event.target.value});
    }

    handleLogin(event) {
      event.preventDefault();
      axios.post("http://localhost:3001/v1/users/sign_in.json", {
                  user: { email: this.state.email, password: this.state.password }
      })
      .then(response => {
          localStorage.setItem('user_jti', response.data.jti);
          this.props.history.push('/')
      })
      .catch(error => this.setState({
              errors: error.response.data.error
          })
      )
    }

  render() {
    return (
          <div className="container">
            <div className="container_wrap">
              <Header/>
              <div className="content">
                <div className="register">
                  <div className="col-md-6 login-left">
                    <h3>New Customers</h3>
                    <p>By creating an account with our store, you will be able to move through the checkout process faster, store multiple shipping addresses, view and track your orders in your account and more.</p>
                    <a className="acount-btn" href="/register">Create an Account</a>
                  </div>
                  <div className="col-md-6 login-right">
                    <h3>Registered Customers</h3>
                    <p>If you have an account with us, please log in.</p>
                    <form onSubmit={this.handleLogin}>
                      <p>{this.state.errors}</p>
                      <div>
                        <span>Email Address<label>*</label></span>
                        <input type="text" onChange={this.handleEmailChange} defaultValue={this.state.email} required/>
                      </div>
                      <div>
                        <span>Password<label>*</label></span>
                        <input type="password" onChange={this.handlePasswordChange} required/>
                      </div>
                      <a className="forgot" href="#">Forgot Your Password?</a>
                      <input type="submit" value="Login" onClick={this.handleLogin}/>
                    </form>
                  </div>
                  <div className="clearfix"> </div>
                </div>
              </div>
            </div>
          </div>
      )
  }
}

export default Login
