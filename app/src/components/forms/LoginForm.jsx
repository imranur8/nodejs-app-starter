import React, { Component } from 'react';
import { Input, Button, message, Form } from 'antd';
import { connect } from "react-redux";
import { authUser } from '../../actions/userActions';
import { getLocalStorage } from "../../helpers/utils";
import { withRouter } from "react-router-dom";
import UserForm from './UserForm';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const tailLayout = {
  wrapperCol: { span: 24 },
};

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, visible : false };
    if (getLocalStorage()) {
      this.props.history.push("/");
    }
  }
  render() {
    const onFinish = async( values ) => {
      try {
        this.setState({loading: true});
        const { email, password } = values;
        const result = await this.props.dispatch(authUser(email, password));
        this.setState({loading: false});
        if (result) {
          message.success(`Welcome ${result.user.name}. Login success`);
          this.props.history.push("/");
        }
      } catch (error) {
        this.setState({loading: false});
        message.error(error.message);
      }
    };
  
    return (
      <Form
        style={{width: 350}}
        {...layout}
        name="basic"
        onFinish={onFinish}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input disabled={this.state.loading} type="email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password disabled={this.state.loading}  />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button loading={this.state.loading} type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
        Don't you have account ? 
        <Button 
          style={{paddingLeft: 5}} 
          onClick={()=>{
            this.setState({visible: true})
          }} 
          type="link"
        >Signup</Button>

        <UserForm
          key={new Date().getTime()}
          visible={this.state.visible}
          onClose={() => {
            this.setState({ visible: false });
          }}
          user={{}}
        />
      </Form>
    );
  }
}

export default withRouter(connect()(LoginForm));