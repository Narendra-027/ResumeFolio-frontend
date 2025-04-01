import React from 'react';
import { Menu } from 'antd';
import { useSelector } from "react-redux";
import { HomeOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom';

// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;

function LeftMenu(props) {
  const user = useSelector(state => state.user);

  const menuItems = [
    {
      key: '/',
      title: 'display',
      label: (
        <Link to="/">
          Home
        </Link>
      ),
      icon: <HomeOutlined />
    }
  ]


  if (user.userData && !user.userData.isAuth){
    return <Menu items={menuItems} mode = "horizontal" style={{width:"250px"}}/>;

  }else{
      return <Menu items={menuItems} mode = "horizontal" style={{width:"250px"}}/>;
  }
}

export default LeftMenu