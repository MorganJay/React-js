import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';

import Form from './common/form';

import http from './../services/httpService';
import * as userService from '../services/userService';
import auth from '../services/authService';


class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label('Username')
      .email({ minDomainSegments: 2 }),
    password: Joi.string().required().label('Password').min(5),
    name: Joi.string()
      .required()
      .label('Name')
      .regex(/^(?![\s.]+$)[a-zA-Z\s.]*$/)
  };

  doSubmit = async () => {
    try {
      const { headers } = await userService.register(this.state.data);
      auth.loginWithJwt(headers['x-auth-token']);
      toast.success('User successfully registered');
      setTimeout(() => {
        window.location = '/';
      }, 300);
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
    return (
      <div className="w-50 mt-5">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}
          {this.renderButton('Register')}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
