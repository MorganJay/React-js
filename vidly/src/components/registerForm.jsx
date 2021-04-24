import React from 'react';
import Joi from 'joi-browser';

import Form from './common/form';

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

  doSubmit = () => {
    // Call the server
    console.log('Submitted');
  };

  render() {
    return (
      <div>
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
