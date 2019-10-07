import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = rest.isAuthenticated;
  const redirectURL = rest.location.pathname;
  console.log(redirectURL)
  return (
    <Route
      {...rest}
      render={props => !isAuthenticated ? (
        <Redirect to={{
          pathname: '/login',
          state: { redirectURL }
        }} />
      ) : (
          <Component {...props} />
        )
      }
    />
  )
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps, {})(PrivateRoute);