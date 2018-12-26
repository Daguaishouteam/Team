import React from 'react';
import {
  Layout, Breadcrumb, Button, Input
} from 'antd';
import {Link} from "react-router-dom";

const Search = Input.Search;

export class Plan extends React.Component {

  state={
    city: localStorage.getItem("city"),
    days: localStorage.getItem("days"),
  };

  render() {
    //const { SubMenu } = Menu;
    const {
      Content, Footer, Sider,
    } = Layout;

    return(
      <Layout className='Plan'>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb className='PlanBreadcrumb' style={{ margin: '16px 0' }}>
            <Breadcrumb.Item><Link to="/city">City Search</Link></Breadcrumb.Item>
            <Breadcrumb.Item>Manage Plan</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className='ShowContent' style={{  background: '#fff'}}>
            <Sider className="firstPlan" width={350} style={{ background: '#b3ccff' }} >
              <div className="Plan-Description">You will have a trip at {this.state.city}</div>
              <div className="Plan-Description">for {this.state.days} days.</div>
              <div className="Plan-Prefix">
                <div className="Plan-Prefix-Search">
                  SEARCH and ADD your places of interests!
                </div>
                <div>
                  <Button style={{margin: "4px"}} type="primary" className="Add-Btn">
                    <Link to='/show'>Add</Link>
                  </Button>
                  <Search
                    placeholder="places of interests"
                    onSearch={value => console.log(value)}
                    style={{ width: 250 }}
                  />
                  <div className="Place-Search-Result">
                    this is the place for the search result list
                  </div>
                </div>
              </div>
            </Sider>
            <Sider width={350} style={{ margin: '0 2px', background: '#b3ccff' }} >
              This is second sider part for ordering the places, color need to be changed
              <div className="Next-Btn-Box">
                <Button type="primary" className="Next-Btn">
                  <Link to='/show'>Build Your Plan!</Link>
                </Button>
              </div>
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
