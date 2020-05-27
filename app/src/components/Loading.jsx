import React, { Component } from 'react';
import {Spin} from "antd";

class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <Spin size="large" />
      </div>
    );
  }
}

export default Loading;