import React from 'react';
import Routes from './routes';
import {getLocalStorage} from "./helpers/utils";
import axios from "axios";
import {message} from "antd";

class App extends React.Component {
  constructor (props) {
    super(props);
    message.config({
      top: 100,
      duration: 2,
      maxCount: 3,
      rtl: true,
    });
  }
  async componentDidMount() {
    if (window.location.pathname !== "/login") {
      const user = getLocalStorage();
      if (user && user.token) {
        try {
          const res = await axios.post(
            "/users/check-token",
            { token : user.token },
          );
          if(res.response && res.response.status === 400) {
            console.log(res.response);
            message.error(`Sorry, ${res.response.data}`);
            setTimeout(function(){
              localStorage.removeItem("user");
              window.location.replace("/login");
            }, 1000)
            
          }
        } catch (error) {
          localStorage.removeItem("user");
          window.location.replace("/login");
        }
      } else {
        window.location.replace("/login");
      }
    }
  }
  render() {
    return (
      <Routes />
    );
  }
}

export default App;
