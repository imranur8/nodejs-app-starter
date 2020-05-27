import React, { Component } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { PageHeader, Button, message } from 'antd';
import { getLocalStorage } from "../helpers/utils";
import UserForm from '../components/forms/UserForm';
import { fetchUsers, deleteUser } from '../actions/userActions';
import { connect } from 'react-redux';
import UserTable from '../components/tables/UserTable';

class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.user = getLocalStorage().user;
    this.state = {
      loading: false,
      visible: false,
      users: [],
      user: {},
    }

  }
  componentDidMount() {
    this.props.dispatch(fetchUsers());
  }
  render() {
    return (
      <DashboardLayout>
        <PageHeader
          className="page-header"
          title="Users"
          subTitle="All users list"
          extra={[
            <Button
              onClick={() => {
                this.setState({
                  visible: true,
                  user: {}
                });
              }}
              key="1"
              type="primary"
            >
              Add user
            </Button>,
          ]}
        >
        </PageHeader>
        <UserTable
          data={this.props.users}
          onEdit={(user) => {
            delete user.password;
            this.setState({
              visible: true,
              user
            });
          }}
          onDelete={async (id) => {
            try {
              const result = await this.props.dispatch(deleteUser(id));
              if (result.status === "success") {
                message.success(`User Successfully Deleted`);
              } else {
                message.error('Sorry, There is something wrong.');
              }
            } catch (error) {
              message.error('Sorry, There is something wrong.');
            }
          }}
        />
        <UserForm
          key={new Date().getTime()}
          visible={this.state.visible}
          onClose={() => {
            this.setState({ visible: false });
          }}
          user={this.state.user}
        />
      </DashboardLayout>
    );
  }
}
const mapStateToProps = (state) => {
  const { users, total } = state.userReducers;
  return {
    users,
    total
  }
}
export default connect(mapStateToProps)(UsersPage);