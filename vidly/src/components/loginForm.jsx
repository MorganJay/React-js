import React, { Component } from 'react';
import Input from './common/input';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' },
    errors: { username: '', password: '' }
  };

  handleSubmit = e => {
    e.preventDefault();

    // Call the server
    console.log(`Submitted - username ${username}`);
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const {
      account: { username, password }
    } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            label="Username"
            name="username"
            type="text"
            value={username}
            onChange={this.handleChange}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={this.handleChange}
          />

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
