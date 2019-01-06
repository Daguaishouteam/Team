import React from 'react';
import {
  Layout, Menu, Breadcrumb, Icon, Button
} from 'antd';
import {Link} from "react-router-dom"


export class Show extends React.Component {

  state = {
    collapsed: false,
    openKeys: ['sub1'],
  };
  toggle = () => {
    if (!this.state.collapsed) {
      this.setState({
        openKeys: [],
      });
    }
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

  render() {
    const { SubMenu } = Menu;
    const {
      Content, Footer, Sider,
    } = Layout;

    return(
      <Layout className='Show'>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb className='ShowBreadcrumb' style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/city">City Search</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/plan">Manage Plan</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Show</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className='ShowContent' style={{ padding: '24px 0', background: '#fff'}}>
            <Sider trigger={null}
                   collapsible
                   collapsed={this.state.collapsed}
                   width={350}
                   style={{ background: '#fff' }}
            >
              <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                style={{ height: '90%' }}
              >
                <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
                  <Menu.Item key="1">Option 1</Menu.Item>
                  <Menu.Item key="2">Option 2</Menu.Item>
                  <Menu.Item key="3">Option 3</Menu.Item>
                  <Menu.Item key="4">Option 4</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Navigation Two</span></span>}>
                  <Menu.Item key="5">Option 5</Menu.Item>
                  <Menu.Item key="6">Option 6</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span><Icon type="setting" /><span>Navigation Three</span></span>}>
                  <Menu.Item key="9">Option 9</Menu.Item>
                  <Menu.Item key="10">Option 10</Menu.Item>
                  <Menu.Item key="11">Option 11</Menu.Item>
                  <Menu.Item key="12">Option 12</Menu.Item>
                </SubMenu>
              </Menu>
              <div className='Show-Sider-Btn-Box'>
                <Button type="primary" className="Show-Btn">
                  <Link to='/plan'>Re-edit</Link>
                </Button>
                <Button type="primary" className="Show-Btn">
                  <Link to='/account'>Save Trip</Link>
                </Button>
                <Button type="primary" className="Show-Btn">
                <Link to='/city'>Drop Trip</Link>
              </Button>
              </div>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              Content
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

