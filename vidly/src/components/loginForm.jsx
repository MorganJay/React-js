import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';

import Form from './common/form';

import http from './../services/httpService';
import auth from '../services/authService';

class LoginForm extends Form {
  state = {
    data: { username: '', password: '' },
    errors: {}
  };

  schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  };

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await auth.login(username, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (error) {
      if (http.expectedError(error, 400)) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
      toast.error(error.response.data);
    }
  };

  render() {
    if (auth.currentUser) return <Redirect to="/" />;

    return (
      <div className="w-50 mt-5">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderButton('Login')}
        </form>
      </div>
    );
  }
}

export default LoginForm;
