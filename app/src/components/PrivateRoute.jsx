import React, { Component } from 'react';
import { Redirect, Route } from "react-router-dom";

class PrivateRoute extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const token = localStorage.getItem("user");
    const { component: Component, roles, ...rest } = this.props;
    return (
      <Route
        {...rest}
        // eslint-disable-next-line no-shadow
        render={props => (token ? <Component {...this.props} /> : <Redirect to="/login" />)}
      />
    );
  }
}


export default PrivateRoute;