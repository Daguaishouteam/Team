import React from 'react';
import {
  Layout, Menu, Breadcrumb, Button
} from 'antd';
import {Link} from "react-router-dom"


export class Plan extends React.Component {
  render() {
    const { SubMenu } = Menu;
    const {
      Content, Footer, Sider,
    } = Layout;

    return(
      <Layout className='Plan'>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/city">City Search</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Manage Plan</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className='ShowContent' style={{  background: '#fff'}}>
            <Sider className="firstPlan" width={300} style={{ background: '#b3ccff' }} >
              This is sider part for search, color need to be changed
              <div className="Next-Btn-Box">
                <Button type="primary" className="Next-Btn">
                  <Link to='/show'>Next</Link>
                </Button>
              </div>
            </Sider>
            <Sider width={350} style={{ margin: '0 2px', background: '#b3ccff' }} >
              This is seconde sider part for search, color need to be changed
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              The whole main part of this page need to be modified.
            </Content>
          </Layout>
        </Content>
        <Footer className='ShowFooter' style={{ textAlign: 'center' }}>
          Plan Your Trip @DaguaishouTeam
        </Footer>
      </Layout>
    );
  }
}
