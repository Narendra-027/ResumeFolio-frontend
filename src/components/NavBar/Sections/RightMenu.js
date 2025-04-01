/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
import {LoginOutlined, UserOutlined,FilePdfOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom';

function RightMenu(props) {

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`, { withCredentials: true }).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  const user = useSelector(state => state.user);
  const menuItems1 = [
    {
      key: 'login',
      title: 'display',
      label: (
        <Link to="/login" >
          Login
        </Link>
      ),
      icon: <LoginOutlined />,
      style: {
        float: 'right'
      }
    },
    {
      key: 'register',
      title: 'display',
      label: (
        <Link to="/register">
          Sign Up
        </Link>
      ),
      icon: <UserOutlined />,
      style: {
        float: 'right'
      }
    }
  ];

  const menuItems2 = [
    {
      key: 'myResume',
      title: 'myResume',
      label: (
        <Link to = "/myresume">My Resumes</Link>
      ),
      icon: <FilePdfOutlined />,
      style: {
        float: 'right'
      }
    },
    {
      key: 'logout',
      title: 'display',
      label: (
        <a onClick={logoutHandler}>Logout</a>
      ),
      icon: <LoginOutlined />,
      style: {
        float: 'right'
      }
    }
  ]

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode = {props.mode} items={menuItems1} style={{ width:'250px'}}/>
    )
  } else {
      return (
        <Menu mode = {props.mode} items={menuItems2} style={{width:"250px"}}/>
      )
  }
}
export default withRouter(RightMenu);

