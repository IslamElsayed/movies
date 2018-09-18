import React, { Component } from 'react';
import axios from 'axios';
import Header from '../Header';

class Movie extends Component {
  constructor(props){
      super(props)
      this.state = {
          movie: null
      }
  }
  componentDidMount() {
      axios.get('http://localhost:3001/v1/movies/'+this.props.match.params.id)
      .then(response => {
          console.log(response.data)
          this.setState({
              movie: response.data
          })
      })
      .catch(error => console.log(error))
  }

  render() {
    return (
        <div className="container">
          { this.state.movie &&
          <div className="container_wrap">
            <Header/>
              <div className="content">
                <div className="movie_top">
                  <div className="col-md-9 movie_box">
                    <div className="grid images_3_of_2">
                      <div className="movie_image">
                        <span className="movie_rating">{this.state.movie.vote_average}</span>
                        <img src={"https://image.tmdb.org/t/p/w185_and_h278_bestv2/" + this.state.movie.poster_path} className="img-responsive" alt=""/>
                      </div>
                    </div>
                    <div className="desc1 span_3_of_2">
                      <p className="movie_option"><strong>Title: </strong>{this.state.movie.title}</p>
                      <p className="movie_option"><strong>Popularity: </strong>{this.state.movie.popularity}</p>
                      <p className="movie_option"><strong>Release date: </strong>{this.state.movie.release_date}</p>
                      <p className="movie_option"><strong>Status: </strong><a href="#">{this.state.movie.status}</a></p>
                      <p className="movie_option"><strong>Budget: </strong>{this.state.movie.budget}</p>
                      <p className="movie_option"><strong>Language </strong>{this.state.movie.original_language}</p> 
                    </div>
                    <div className="clearfix"> </div>
                    <p className="m_4">{this.state.movie.overview}</p>

                  </div>
                <div className="clearfix"> </div>
              </div>
            </div>
          </div>
          }
        </div>
      )
  }
}

export default Movie