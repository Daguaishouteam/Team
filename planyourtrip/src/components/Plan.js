import React from 'react';
import {
  Layout, Breadcrumb, Button, Input, InputNumber, Icon, List, Spin, message
} from 'antd';
import {Link} from "react-router-dom";
import reqwest from "reqwest";
import InfiniteScroll from 'react-infinite-scroller';

const Search = Input.Search;
const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

export class Plan extends React.Component {

  state={
    city: localStorage.getItem("city"),
    days: Number(localStorage.getItem("days")),
    currentDay: 0,
    data: new Array(Number(localStorage.getItem("days"))),
    currentData: [],
    initSearch: true,
    initList: true,
    loading: false,
    hasMore: true,
  }

  componentDidMount() {
    if (this.state.initList) {

      this.setState({initList: false},() => {
        console.log(this.state);
      });
    } else {
      this.fetchData((res) => {
        this.setState({
          data: res.results,
          currentData: [res.results[this.state.currentDay]],
        },() => {
          console.log("componentDidMount", JSON.stringify(this.state.data));
          localStorage.setItem("data", JSON.stringify(this.state.data));
        });
      });
    }
  }

  fetchData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
    console.log("fetchData",this.state);
  }

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
    console.log("InfiniteOnLoad",this.state);
  }

  onChange = (value) => {
    console.log(value);
    this.componentDidMount();
    this.setState({currentDay: Number(value)-1,},() => {
      console.log(this.state)
    });
  }

  handleAdd = (value) => {
    this.componentDidMount();
    console.log("handleAdd");
    return null;
  }

  handleUp = (key) => {
    console.log("handleUp",key);
    return null;
  }

  handleDelete = () => {
    console.log("handleDel");
    return null;
  }

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
            <Sider className="firstPlan" width={350} style={{ background: '#e1e1ea' }} >
              <div className="Plan-Description">You will have a trip at {this.state.city}</div>
              <div className="Plan-Description">for {this.state.days} days.</div>
              <div className="Plan-Prefix">
                <div className="Plan-Prefix-Search">
                  SEARCH and ADD your places of interests!
                </div>
                  <Search
                    placeholder="places of interests"
                    onSearch={value => console.log(value)}
                    style={{ width: 300 }}
                  />
                <div className="Plan-Prefix-Search">
                  <Button type="primary" className="Add-Btn" onClick={this.handleAdd}>
                    Add
                  </Button> <span className="Plan-Day-Trip">to Day</span>
                  <InputNumber size="default" style={{width: 60}} min={1} max={Number(localStorage.getItem("days"))} defaultValue={1} onChange={this.onChange} />
                </div>
              </div>
            </Sider>
            <Sider width={350} style={{ margin: '0 2px', background: '#e1e1ea' }} >
              <div className="Day-List">
                <InfiniteScroll
                  initialLoad={false}
                  pageStart={0}
                  loadMore={this.handleInfiniteOnLoad}
                  hasMore={!this.state.loading && this.state.hasMore}
                  useWindow={false}
                >
                  <List
                    dataSource={this.state.currentData}
                    renderItem={item => (
                      <List.Item key={item.id}>
                        <List.Item.Meta
                          title={<a href="https://ant.design">{item.name.last}</a>}
                          description={item.email}
                        />
                        <div><a onClick={this.handleUp.bind(this)}><Icon type="arrow-up" /></a> or <a onClick={this.handleDelete}><Icon type="delete" /></a></div>
                      </List.Item>
                    )}
                  >
                    {this.state.loading && this.state.hasMore && (
                      <div className="demo-loading-container">
                        <Spin />
                      </div>
                    )}
                  </List>
                </InfiniteScroll>
              </div>
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
