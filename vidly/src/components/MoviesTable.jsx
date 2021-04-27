import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableHeader from './common/TableHeader';
import TableBody from './common/TableBody';
import Like from './common/like';
import auth from '../services/authService';

class MoviesTable extends Component {
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: movie => (
        <Like liked={movie.liked} onClick={() => this.props.onLike(movie)} />
      )
    }
  ];

  deleteColumn = {
    key: 'delete',
    content: movie => (
      <button
        onClick={() => this.props.onDelete(movie)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    )
  };

  constructor() {
    super();
    const user = auth.getCurrentUser(); // TODO: refactor to use auth.currentUser;
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
    console.log(user);
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <table className="table font-weight-bold">
        <TableHeader
          columns={this.columns}
          sortColumn={sortColumn}
          onSort={onSort}
        />
        <TableBody columns={this.columns} data={movies} />
      </table>
    );
  }
}

export default MoviesTable;
