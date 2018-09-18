import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { Redirect } from 'react-router-dom'
import Header from '../Header';

class Register extends Component {
  constructor(props) {
      super(props);

      this.state = {
        email: "",
        password: "",
        password_confirmation: "",
        errors: {}
      };
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handlePasswordConfirmationChange = this.handlePasswordConfirmationChange.bind(this);
      this.handleRegistration = this.handleRegistration.bind(this);
    }

    handleEmailChange(event) {
       this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
       this.setState({password: event.target.value});
    }

    handlePasswordConfirmationChange(event) {
       this.setState({password_confirmation: event.target.value});
    }

    handleRegistration(event) {
      event.preventDefault();
      axios.post("http://localhost:3001/v1/users.json", 
                  { user: { email: this.state.email, password: this.state.password,
                          password_confirmation: this.state.password_confirmation } 
      })
      .then(response => {
          localStorage.setItem('user_jti', response.data.jti);
          this.props.history.push('/')
      })
      .catch(error => 
          this.setState({
              errors: error.response.data.errors[0]
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
                  <form onSubmit={this.handleRegistration}>
                    <div className="register-top-grid">
                      <h3>Personal Information</h3>
                      <div>
                        <span>Email Address<label>*</label></span>
                        <input type="text" onChange={this.handleEmailChange} required/>
                        <span>{this.state.errors.email}</span>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                      <div className="clearfix"> </div>
                    <div className="register-bottom-grid">
                      <h3>Login Information</h3>
                      <div>
                        <span>Password<label>*</label></span>
                        <input type="password" onChange={this.handlePasswordChange}/>
                        <span>{this.state.errors.password}</span>
                      </div>
                      <div>
                        <span>Confirm Password<label>*</label></span>
                        <input type="password" onChange={this.handlePasswordConfirmationChange}/>
                        <span>{this.state.errors.password_confirmation}</span>
                      </div>
                      <div className="clearfix"> </div>
                    </div>
                  </form>
                  <div className="clearfix"> </div>
                  <div className="register-but">
                    <form>
                      <input type="submit" value="submit" onClick={this.handleRegistration}/>
                      <div className="clearfix"> </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )
  }
}

export default Register
