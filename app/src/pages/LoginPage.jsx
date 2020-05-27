import React, { Component } from 'react';
import { Divider } from "antd";
import LoginForm from '../components/forms/LoginForm'

class LoginPage extends Component {
  render() {
    return (
      <div className="login-page-container" style={{ height: "100vh", width: "100vw", paddingLeft: 50 }}>
        <div style={{ width: 350, paddingTop: "20vh" }} >
          <h1 style={{ fontWeight: 100, color: "#001529", fontSize: 40 }}> Nodejs App Starter </h1>
          <p style={{width: 700}}>Nodejs app starter with express + typescript + typeORM + React + Redux + Ant design</p>
          <Divider />
          <LoginForm />
        </div>
      </div>
    )
  }
}
export default LoginPage;