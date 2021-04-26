import React from 'react';
import Joi from 'joi-browser';

import * as authService from '../services/authService';

import Form from './common/form';

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
      await authService.login(username, password);
    } catch (error) {
       if (handleExpectedError(error, 400)) {
         const errors = { ...this.state.errors };
         errors.username = error.response.data;
         this.setState({ errors });
       }
       toast.error(error.response.data);
    }
  };

  render() {
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
