import React, { Component } from 'react';

export default class LogOut extends Component {
  componentDidMount() {
    localStorage.removeItem('token');
    window.location = '/';
  }

  render() {
    return null;
  }
}
