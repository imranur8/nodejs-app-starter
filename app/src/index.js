import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './style.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import axios from 'axios';
import { Service } from 'axios-middleware';
import {message} from "antd";

const service = new Service(axios);
service.register({
  onResponseError(error) {
    const { status, data } = error.response;
    const messageObject = JSON.parse(data);
    if(status === 400 && messageObject.message === "JsonWebTokenError") {
      message.error("Sorry, invalid token provided");
      setTimeout(function(){
        localStorage.removeItem("user");
        window.location.replace("/login");
      }, 1000);
      return;
    }
    if(status === 400 && messageObject.message === "TokenExpiredError") {
      message.error("Sorry, your token expired, please login again");
      setTimeout(function(){
        localStorage.removeItem("user");
        window.location.replace("/login");
      }, 1000);
      return;
    }
    return error;
  }
});
axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
let user = localStorage.getItem("user");
if (user) {
  user = JSON.parse(user);
  axios.defaults.headers = {
    Authorization: user.token,
  };
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
