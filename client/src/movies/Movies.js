import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';
import { render } from 'react-dom';
import {Router, Route} from 'react-router';
import Pagination from "react-js-pagination";
import Header from '../Header';

class Movies extends Component {
    constructor(props){
      super(props)
      this.state = {
          movies: [],
          response: {},
          keyword: '',
          favoriteIds: []
      }
      this.handleSearch = this.handleSearch.bind(this);
      this.handlePageChange = this.handlePageChange.bind(this);
      this.addToFavorites = this.addToFavorites.bind(this);
      this.removeFromFavorites = this.removeFromFavorites.bind(this);
  }

  componentDidMount() {
    let queryParamsString = this.props.location.search.substring(1)
    let searchParams = new URLSearchParams( queryParamsString );
    let keyword = searchParams.get("keyword") || ''
    let headers = { 'Authorization': `Bearer ${localStorage.getItem("user_jti")}` }
    let favoriteIds = []

    axios.get('http://localhost:3001/v1/favorites', { headers: headers })
    .then(response => { favoriteIds = response.data.map((favorite) => { return favorite.mdb_id }) })

    axios.get('http://localhost:3001/v1/movies?keyword=' +keyword)
    .then(response => {
        this.setState({
            movies: response.data.results,
            response: response.data,
            keyword: keyword,
            favoriteIds: favoriteIds
        })
    })
    .catch(error => console.log(error))
  }

  handleSearch(event) {
    event.preventDefault();
    let keyword = document.getElementsByName('keyword')[0].value
    axios.get('http://localhost:3001/v1/movies?keyword=' +keyword)
    .then(response => {
        this.setState({
            movies: response.data.results,
            response: response.data,
            keyword: keyword
        })
        window.history.pushState(null, '', '?keyword=' +keyword)
    })
    .catch(error => console.log(error))
  }

  handlePageChange(page) {
    let keyword = this.state.keyword
    axios.get("http://localhost:3001/v1/movies?keyword="+keyword+"&page="+page)
    .then(response => {
        this.setState({
            movies: response.data.results,
            response: response.data,
            keyword: keyword
        })
    })
    .catch(error => console.log(error))
  }

  addToFavorites(event){
    event.preventDefault();
    let id = event.target.dataset.movieId
    let headers = { 'Authorization': `Bearer ${localStorage.getItem("user_jti")}` }
    axios.post('http://localhost:3001/v1/favorites', { favorite: { mdb_id: id } }, { headers: headers })
    .then(response => {
        let favoriteIds = this.state.favoriteIds
        favoriteIds.push(response.data.mdb_id)
        localStorage.setItem('favorite_ids', JSON.stringify(favoriteIds));
        this.setState({
            favoriteIds: favoriteIds
        })
    })
    .catch(error => console.log(error))
  }

  removeFromFavorites(event){
    event.preventDefault();
    let id = event.target.dataset.movieId
    let headers = { 'Authorization': `Bearer ${localStorage.getItem("user_jti")}` }
    axios.delete(`http://localhost:3001/v1/favorites/${id}`, { headers: headers })
    .then(response => {
        let favoriteIds = response.data.map((favorite) => { return favorite.mdb_id })
        this.setState({
            favoriteIds: favoriteIds
        })
    })
    .catch(error => console.log(error))
  }


  render() {
    return (
        <div className="container">
          <div className="container_wrap">
            <Header/>
            <div className="content">
              <h2 className="m_3">Search results</h2>
              <div className="search">
                <form onSubmit={this.handleSearch}>
                  <input name="keyword" type="text" placeholder="Search..." defaultValue={this.state.keyword} required/>
                  <input type="submit" value=""/>
                </form>
              </div>
              <div className='clearfix'></div>
              <div className="movie_top">
                <div className="col-md-12 movie_box">
                  {this.state.movies &&
                    this.state.movies.map((movie, index) => {
                      return <div className="movie movie-test movie-test-dark movie-test-left" key={index}>
                        <div className="movie__images">
                          <a href={"http://localhost:3000/movies/" +movie.id } className="movie-beta__link">
                            { movie.poster_path != null &&
                              <img src={"https://image.tmdb.org/t/p/w185_and_h278_bestv2/"+ movie.poster_path} className="img-responsive" alt=""/>
                            }
                            { movie.poster_path == null &&
                              <img src='https://via.placeholder.com/185x278' className="img-responsive" alt=""/>
                            }
                          </a>
                        </div>
                        <div className="movie__info">
                          <a href={"http://localhost:3000/movies/" +movie.id } className="movie__title">{movie.title} </a>
                          <p className="movie__time">{movie.release_date}</p>
                          <br/>
                          <p className="movie__option">{movie.overview}</p>
                          <ul className="list_6">
                            <li>Rating : &nbsp;&nbsp;
                              <p>{movie.vote_average}</p>
                            </li>
                            { localStorage.getItem("user_jti") &&
                              (this.state.favoriteIds.indexOf(`${movie.id}`) == -1 &&
                                <li><a href="#" onClick={this.addToFavorites} data-movie-id={movie.id}>Add to favorite</a></li>)
                                ||
                               (this.state.favoriteIds.indexOf(`${movie.id}`) != -1 &&
                                <li><a href="#" onClick={this.removeFromFavorites} data-movie-id={movie.id}>Remove from favorite</a></li>)
                            }
                            <div className="clearfix"> </div>
                          </ul>
                        </div>
                        <div className="clearfix"> </div>
                      </div>
                    })
                }
                  <div className="clearfix"> </div>
                </div>
              </div>
              <div className="clearfix"> </div>
              {this.state.movies &&
                <Pagination
                  activePage={this.state.response.page}
                  itemsCountPerPage={20}
                  totalItemsCount={this.state.response.total_results}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                  getPageUrl={(i) => `http://localhost:3001/v1/movies?keyword=${this.state.keyword}&page=${i}`}
                />
              }
              { !this.state.movies &&
                <div>
                <h1>Welcome to movie store, Please type something in the search bar</h1>
              </div>
              }
            </div>
          </div>
        </div>
    );
  }
}

export default Movies
