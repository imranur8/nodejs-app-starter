import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Loadable from 'react-loadable';
import PrivateRoute from './components/PrivateRoute';
import Loading from "./components/Loading";

const HomePage = Loadable({
  loader: () => import(/* webpackChunkName: "honePage" */ "./pages/HomePage"),
  loading: () => <Loading/>,
});
const LoginPage = Loadable({
  loader: () => import(/* webpackChunkName: "loginPage" */ "./pages/LoginPage"),
  loading: () => <Loading/>,
});
const UsersPage = Loadable({
  loader: () => import(/* webpackChunkName: "usersPage" */ "./pages/UsersPage"),
  loading: () => <Loading/>,
});
class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage} />
        <PrivateRoute path="/users" exact component={UsersPage} />
      </Switch>
    );
  }
}

export default Routes;