import React, { Component } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/common/Navbar';
import Movies from './components/movies';
import Customers from './components/customers';
import Rentals from './components/rentals';
import NotFound from './components/common/NotFound';
import MovieForm from './components/movieForm';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';

// query string library for parsing query from location.search  const query = queryString.parse(location.search);
// example url with query : http://localhost:3000/posts/2018/06?added=now&sortBy=ascending
// <Route path="/posts/:year?/:month?" component={Posts} />
// parse accordingly when working with numbers or booleans

class App extends Component {
  render() {
    return (
      <>
        <ToastContainer />
        <Navbar />
        <main className="container h-auto d-flex justify-content-center align-items-center">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact from="/" to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </>
    );
  }
}

export default App;
