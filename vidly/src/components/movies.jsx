import React, { Component } from 'react';
import Pagination from './common/Pagination';
import FilterList from './common/FilterList';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { paginate } from '../utils/paginate';
import { getGenres } from '../services/fakeGenreService';
import MoviesTable from './MoviesTable';
import _ from 'lodash';
import Input from './common/input';

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: null,
    sortColumn: { path: 'title', order: 'asc' }
  };

  componentDidMount() {
    const genres = [{ _id: '', name: 'All Genres' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    deleteMovie(movie._id)
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => this.setState({ currentPage: page });

  handleGenreSelect = genre =>
    this.setState({ selectedGenre: genre, currentPage: 1 });

  handleSort = sortColumn => this.setState({ sortColumn });

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
      movies: allMovies
    } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );

    const movies = paginate(sortedMovies, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <FilterList
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <button
            className="btn btn-primary my-2"
            onClick={() => this.props.history.push('movies/new')}
          >
            New Movie
          </button>
          <p className="mb-1">Showing {filteredMovies.length} movies in the database.</p>
          <Input placeholder="Search..." />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filteredMovies.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
