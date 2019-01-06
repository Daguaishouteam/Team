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

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };


  render() {
    const { initLoading, list } = this.state;

    return (
      <div>
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
      </div>
    );
  }
}