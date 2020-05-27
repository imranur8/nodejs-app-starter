import React, { Component } from 'react';
import { Table, Divider, Tag, Modal, Avatar, Row, Col } from 'antd';

const { confirm } = Modal;


class UserTable extends Component {
  constructor(props) {
    super(props);
    this.showDeleteConfirm = this.showDeleteConfirm.bind(this);
  }
  showDeleteConfirm = (id, name) => {
    const me = this;
    confirm({
      title: `Are you sure delete this user ${name}?`,
      content: 'It will delete all other information related with this user from system',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        me.props.onDelete(id);
      },
      onCancel() {
      },
    });
  };

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a onClick={() => this.props.onEdit(record)}>Edit</a>
            <Divider type="vertical" />
            <a onClick={() => this.showDeleteConfirm(record.id, record.name)}>Delete</a>
          </span>
        ),
      },
    ];
    return (
      <Table columns={columns} dataSource={this.props.data} />
    );
  }
}

export default UserTable;