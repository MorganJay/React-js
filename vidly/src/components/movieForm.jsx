import React from 'react';

const MoviesForm = ({ match, history }) => {
  const handleSave = () => {
    history.replace('/movies');
  };

  return (
    <div>
      <h1>Movie Form {match.params.id}</h1>
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default MoviesForm;
