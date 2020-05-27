import React, { Component } from 'react';
import { Layout, Row, Col } from 'antd';
import { HeartTwoTone } from '@ant-design/icons';
import Header from './Header';
const { Content, Footer } = Layout;

class DashboardLayout extends Component {
  render() {
    return (

      <React.Fragment>
        <Layout style={{ minHeight: '100vh' }}>
          <Header />
          <Layout>
            <Content style={{ marginTop: 70 }}>
              <Row>
                <Col span={18} offset={3}>
                  {this.props.children}
                </Col>
              </Row>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              Made with <HeartTwoTone twoToneColor="#eb2f96" /> in Dhaka
            </Footer>
          </Layout>
        </Layout>
      </React.Fragment>
    );
  }
}
export default DashboardLayout;