import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../services/authService';

const ProtectedRoute = ({ component: Component, render, ...props }) => {
  return (
    <Route
      {...props}
      render={props =>
        !auth.getCurrentUser() ? (
          <Redirect to="/login" />
        ) : Component ? (
          <Component {...props} />
        ) : (
          render(props)
        )
      }
    />
  );
};

export default ProtectedRoute;
