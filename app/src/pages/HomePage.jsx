import React, { Component } from 'react';
import DashboardLayout from '../components/DashboardLayout'
import { withRouter } from "react-router-dom";
import { Statistic, Card, Row, Col, Result } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  LikeOutlined
} from '@ant-design/icons';

class HomePage extends Component {
  render() {
    return (
      <DashboardLayout>
        <div style={{ marginTop: 10, padding: 24, background: '#fff', minHeight: 360 }}>
          <Result
            status="success"
            title="Welcome to nodejs app starter"
            subTitle="Nodejs app starter with express + typescript + typeORM + React + Redux + Ant-design"
          />
        </div>
        <Row gutter={16} style={{ marginTop: 20 }}>
          <Col span={6}>
            <Card>
              <Statistic
                title="Active"
                value={11.28}
                precision={2}
                valueStyle={{ color: '#3f8600' }}
                prefix={<ArrowUpOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="Idle"
                value={9.3}
                precision={2}
                valueStyle={{ color: '#cf1322' }}
                prefix={<ArrowDownOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Feedback" value={1128} prefix={<LikeOutlined />} />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic title="Unmerged" value={93} suffix="/ 100" />
            </Card>
          </Col>
        </Row>
      </DashboardLayout>
    );
  }
}

export default withRouter(HomePage);