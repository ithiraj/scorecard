import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';

import Container from "../container/Container";

import 'antd/dist/antd.css';
import './Layout.css'

const MainLayout = () => {
const { Header, Content, Footer } = Layout;

  return (
    <Layout className="main-layout">
        <Layout className="site-layout">
          <Content className="site-layout-background">
            <Container/>
          </Content>
        </Layout>
      </Layout>
  );
};


export default MainLayout