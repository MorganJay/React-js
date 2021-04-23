import React, { Component } from 'react';
import Joi from 'joi-browser';

import Input from './common/input';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    errors: {  }
  };

  schema = {
    username: Joi.string().required(),
    password: Joi.string().required()
  };

  validate = () => {
    const result = Joi.validate(this.state.account, this.schema, {
      abortEarly: false
    });
    console.log(result);

    const errors = {};
    const {
      account: { username, password }
    } = this.state;
    if (username.trim() === '') errors.username = 'Username is required.';
    if (password.trim() === '') errors.password = 'Password is required.';

    return Object.keys(errors).length === 0 ? null : errors; // ? why doesn't the form submit when I return {} instead of null
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();

    this.setState({ errors: errors || {} }); // not clean
    if (errors) return;

    // Call the server
    console.log('Submitted');
  };

  validateProperty = ({ name, value }) => {
    if (name === 'username') {
      if (value.trim() === '') return 'Username is required.';
      // ...
    }
    if (name === 'password') {
      if (value.trim() === '') return 'Password is required.';
      // ...
    }
  };

  handleChange = ({ currentTarget: input }) => {
    const { name, value } = input;
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[name] = errorMessage;
    else delete errors[name];

    const account = { ...this.state.account };
    account[name] = value;

    this.setState({ account, errors });
  };

  render() {
    const { account, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Username"
            name="username"
            type="text"
            value={account.username}
            onChange={this.handleChange}
            error={errors.username}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={account.password}
            onChange={this.handleChange}
            error={errors.password}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
