import React from 'react';
import Joi, { errors } from 'joi-browser';

import * as userService from '../services/userService';
import { handleExpectedError } from './../services/httpService';

import Form from './common/form';
import { toast } from 'react-toastify';

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
      await userService.register(this.state.data);
    } catch (error) {
      if(handleExpectedError(error, 400)){
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        this.setState({ errors })
      }
      toast.error(ex.response.data)
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
