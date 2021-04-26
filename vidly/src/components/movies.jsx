import React, { Component } from 'react';
import _ from 'lodash';
import { toast } from 'react-toastify';

import { getGenres } from './../services/genreService';
import { getMovies, deleteMovie } from '../services/movieService';
import { paginate } from '../utils/paginate';

import Pagination from './common/Pagination';
import FilterList from './common/FilterList';
import MoviesTable from './MoviesTable';
import SearchBox from './common/SearchBox';
import Loading from './common/loading';

class Movies extends Component {
  state = {
    search: '',
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedGenre: { _id: '', name: 'All Genres' },
    sortColumn: { path: 'title', order: 'asc' }
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [this.state.selectedGenre, ...data];
    const { data: movies } = await getMovies();
    this.setState({ movies, genres }, () => toast('Enjoy!!'));
  }

  handleDelete = async movie => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(m => m._id !== movie._id);
    this.setState({ movies });

    try {
      await deleteMovie(movie._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error('This movie has already been deleted or does not exist.');

      this.setState({ movies: originalMovies });
    }
  };

  handleSearch = query =>
    this.setState({
      search: query.toLowerCase(),
      selectedGenre: null,
      currentPage: 1
    });

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = page => this.setState({ currentPage: page });

  handleGenreSelect = genre =>
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
      search: ''
    });

  handleSort = sortColumn => this.setState({ sortColumn });

  getPagedData = () => {
    const {
      search,
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies
    } = this.state;

    let filtered = allMovies;
    if (search) {
      filtered = allMovies.filter(
        m => m.title.toLowerCase().indexOf(search) !== -1
      );
    } else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn, search } = this.state;

    if (count === 0) return <Loading />;

    const { totalCount, data: movies } = this.getPagedData();

    return (
      <div className="row" style={{ width: 'inherit' }}>
        <div className="col col-sm-12 col-md-3 mb-sm-2">
          <FilterList
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col col-md-9">
          <button
            className="btn btn-primary my-2"
            onClick={() => this.props.history.push('movies/new')}
          >
            New Movie
          </button>
          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox value={search} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
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
