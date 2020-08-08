import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LineChartOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

const { Item } = Menu;
const { Header } = Layout;

const Hero = () => {
  const location = useLocation();
  const defaultSelectedKeys = location.pathname === "/posts" ? "2" : "1";

  return (
    <Header>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[defaultSelectedKeys]}
      >
        <Item key="1">
          <LineChartOutlined />
          <span>Line Chart</span>
          <Link to="/" />
        </Item>
        <Item key="2">
          <UnorderedListOutlined />
          <span>Posts</span>
          <Link to="/posts" />
        </Item>
      </Menu>
    </Header>
  );
};

export default Hero;
