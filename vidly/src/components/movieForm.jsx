import React from 'react';
import Joi from 'joi-browser';

import { getGenres } from '../services/fakeGenreService';
import { saveMovie, getMovie } from './../services/fakeMovieService';

import Form from './common/form';

class MoviesForm extends Form {
  state = {
    data: {
      _id: '',
      title: '',
      genreId: '',
      numberInStock: '',
      dailyRentalRate: ''
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .required()
      .label('Number in Stock')
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .required()
      .label('dailyRentalRate')
      .min(0)
      .max(10)
  };

  mapMovieToViewModel = movie => {
    const {
      _id,
      title,
      genre: { _id: genreId },
      numberInStock,
      dailyRentalRate
    } = movie;
    const data = {
      _id: _id,
      title: title,
      genreId: genreId,
      numberInStock: numberInStock,
      dailyRentalRate: dailyRentalRate
    };
    this.setState({ data });
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = this.props.match.params.id;
    if (movieId === 'new') return;

    const movie = getMovie(movieId);
    if (!movie) return this.props.history.replace('/not-found');

    this.setState({ data: this.mapToViewModel(movie) });
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.replace('/movies');
  };

  render() {
    return (
      <div className="col-7 my-0 mx-auto">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MoviesForm;
