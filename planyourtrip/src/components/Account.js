import React from 'react';
import {
  List, Skeleton,
} from 'antd';
import { Link } from 'react-router-dom';
import reqwest from 'reqwest';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;

export class Account extends React.Component {

  state = {
    initLoading: true,
    data: [],
    list: [],
  }

  componentDidMount() {
    this.getData((res) => {
      this.setState({
        initLoading: false,
        data: res.results,
        list: res.results,
      });
    });
  }

  getData = (callback) => {
    reqwest({
      url: fakeDataUrl,
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        callback(res);
      },
    });
  }


  render() {
    const { initLoading, list } = this.state;

    return (
      <List
        className="Account-Box"
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item actions={[<Link to="/show">show</Link>, <Link to="/account">delete</Link>]}>
            <Skeleton title={false} loading={item.loading} active>
              <List.Item.Meta
                title={<a href="https://ant.design">{item.name.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </Skeleton>
          </List.Item>
        )}
      />
    );
  }
}