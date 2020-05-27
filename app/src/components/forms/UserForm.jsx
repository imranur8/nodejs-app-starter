import React, { Component } from 'react';
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, message } from 'antd';
import { connect } from "react-redux";
import { addUser, editUser } from '../../actions/userActions';

class LoginForm extends React.Component {
  
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  onFinish = async (values) => {
    console.log(values);
    try {
      let result, method;
      if (this.props.user.id) {
        method = 'Updated';
        result = await this.props.dispatch(editUser(this.props.user.id, values));
      } else {
        method = 'Added';
        result = await this.props.dispatch(addUser(values));
      }
      if (result.status === "success") {
        message.success(`User ${method} successfully`);
        this.props.onClose();
      } else {
        if (result.error.response.data.code && result.error.response.data.code === 11000) {
          message.error(`Sorry, Email ${values.email} already exist. Try another one.`);
        } else {
          message.error('Sorry, There is something wrong.');
        }
      }
    } catch (error) {
      console.log(error);
      message.error('Sorry, There is something wrong.');
    }
  }
  render(){
    return (
      <>
        <Drawer
          title={this.props.user.id ? "Edit user" : "Create a new user"}
          width={420}
          onClose={this.props.onClose}
          visible={this.props.visible}
          bodyStyle={{ paddingBottom: 80 }}
        >
          <Form 
            layout="vertical"
            onFinish={this.onFinish}
            initialValues={this.props.user}
          >
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: 'Please enter user name' }]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
              
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="email"
                  label="Email"
                  rules={[{ required: true, message: 'Please enter user email' }]}
                >
                  <Input disabled={this.props.user.email} placeholder="Please enter user name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[{ required: true, message: 'Please enter user password' }]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="phone"
                  label="Phone"
                  rules={[{ required: true, message: 'Please enter user phone' }]}
                >
                  <Input placeholder="Please enter user name" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={24}>
                <Form.Item
                  name="address"
                  label="Address"
                >
                  <Input.TextArea rows={4} placeholder="please enter user address" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Button onClick={this.props.onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Drawer>
      </>
    );
  }
  
};

export default connect()(LoginForm);