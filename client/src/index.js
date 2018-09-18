import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Movies from './movies/Movies';
import Movie from './movies/Movie';
import Login from './users/Login';
import Register from './users/Register';
// Import routing components
import { BrowserRouter, Link, Route } from 'react-router-dom';

ReactDOM.render(
                <BrowserRouter>
                  <div>
                    <Route exact path="/" component={Movies}/>
                    <Route exact path="/movies/:id" component={Movie}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}/>
                  </div>
               </BrowserRouter>,
               document.getElementById('root'));
registerServiceWorker();
