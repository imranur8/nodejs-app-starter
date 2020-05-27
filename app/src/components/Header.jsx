import React, { Component } from 'react';
import { Menu, Row, Col} from "antd";
import { getLocalStorage } from "../helpers/utils";
import { Link, withRouter } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Header extends Component {
  constructor(props) {
    super(props);
    this.user = getLocalStorage().user;
  }

  render() {
    let menuList = [
      <Menu.Item key="/">
        <Link to="/">
          <span>Home</span>
        </Link>
      </Menu.Item>,
      <Menu.Item key="/users">
        <Link to="/users">
          <span>Users </span>
        </Link>
      </Menu.Item>,
      <SubMenu title={this.user.name}>
        <Menu.Item >
          <Link
            onClick={() => {
              localStorage.removeItem("user");
              this.props.history.push("/login");
            }}>
            <LogoutOutlined
              style={{ color: "red" }}
            />
            <span>Logout</span>
          </Link>
        </Menu.Item>
      </SubMenu>
    ];

    return (
      <div
        style={{
          backgroundColor: "white",
          borderBottom: '1px solid #e8e8e8',
          position: "fixed",
          width: "100vw",
          height: 70,
          zIndex: 1000
        }}
      >
        <Row>
          <Col span={18} offset={3}>
            <Link className="logo" to="/">Nodejs App starter</Link>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={[this.props.location.pathname]}
              style={{ lineHeight: '64px', borderBottom: 'none', float: 'right' }}
            >
              {menuList}
            </Menu>
          </Col>
        </Row>

      </div>
    );
  }
}

export default withRouter(Header);