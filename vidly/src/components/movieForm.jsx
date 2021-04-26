import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';

import { getGenres } from '../services/genreService';
import { saveMovie, getMovie } from '../services/movieService';

import Form from './common/form';
import { handleExpectedError } from './../services/httpService';

class MoviesForm extends Form {
  state = {
    data: {
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
      .min(0)
      .max(100)
      .label('Number in Stock'),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label('Daily Rental Rate')
  };

  mapDataToView(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  }

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === 'new') return;
      
      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapDataToView(movie) });
    } catch (error) {
      if (handleExpectedError(error, 404))
        this.props.history.replace('/not-found');
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  doSubmit = async () => {
    try {
      await saveMovie(this.state.data);
      this.props.history.replace('/movies');
    } catch (ex) {
      toast.error('An unexpected error occurred');
      console.log(ex);
    }
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
