import React, { Component } from 'react';
import MoviePage from './context/MoviePage';
import UserContext from './context/userContext';
import CartContext from './context/cartContext';
import Movie from './hoc/Movie';
import Counter from './hooks/Counter';
import Users from './hooks/Users';
import './App.css';
import Login from './context/Login';

// function App() {
//   return (
//
//   );
// }

class App extends Component {
  state = { currentUser: null };

  handleLoggedIn = username => {
    console.log('Getting the user:' + username);
    const user = { name: 'James' };
    this.setState({ currentUser: user });
  };

  render() {
    return (
      <CartContext.Provider value={{ cart: [] }}>
        <UserContext.Provider
          value={{
            currentUser: this.state.currentUser,
            onLoggedIn: this.handleLoggedIn
          }}
        >
          <div
            style={{ display: 'grid', placeItems: 'center', height: '100vh' }}
          >
            <Movie id={1} />
            <Counter />
            <Users />
            <MoviePage />
            <Login />
          </div>
        </UserContext.Provider>
      </CartContext.Provider>
    );
  }
}

export default App;
