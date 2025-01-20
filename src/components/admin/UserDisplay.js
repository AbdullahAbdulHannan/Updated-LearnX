import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import { server } from '../..';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Role',
    dataIndex: 'role',
  },
];

const Users = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${server}/api/users`, {
          headers: {
            token: localStorage.getItem("token"),
          },
        });
        console.log('API Response:', response.data); // Log the response
        
        const users = response.data.users.map(user => ({ // Adjust based on your API structure
          key: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        }));
        setData(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      // title={() => 'LearnX Users'}
      // footer={() => 'Footer'}
    />
  );
};

export default Users;
