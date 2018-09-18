import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

class Header extends Component {
  constructor(props){
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout = async event => {
    event.preventDefault();
    localStorage.removeItem('user_jti')
    localStorage.removeItem('favorite_ids')
    let headers = { 'Authorization': `Bearer ${localStorage.getItem("user_jti")}` }
    axios.delete('http://localhost:3001/v1/users/sign_out', { headers: headers })
    .then(response => {
       window.location.assign('/')
    })
  }

  render() {
    return (
        <div className="header_top">
          <div className="col-sm-3 logo"><a href="/"><img src="../images/logo.png" alt=""/></a></div>
          <div className="col-sm-6 nav">
            <ul>
            </ul>
          </div>
          <div className="col-sm-3 header_right nav">
            <ul className="header_right_box">
              <li>
                {!localStorage.getItem('user_jti') &&
                <p><a href="/login">Login</a></p>
                }
                {localStorage.getItem('user_jti') &&
                <p><a href="/logout" onClick={this.handleLogout}>Logout</a></p>
                }
              </li>
              <div className="clearfix"> </div>
            </ul>
          </div>
          <div className="clearfix"> </div>
        </div>
        )
  }
}

export default Header