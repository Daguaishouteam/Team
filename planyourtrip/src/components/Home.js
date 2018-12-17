import React from 'react';
import { Link } from "react-router-dom";
import { Button, Layout } from "antd";

export class Home extends React.Component {
  render() {

    const Content = Layout;

    return (
      <Content className="Home">
        <div className="Home-Title">
          <div>Plan Your Trip,</div>
          <div>Enjoy Your Trip!</div>
        </div>
        <div>
          <Button type="primary" className="Home-Btn">
            <Link to='/login'>Login</Link>
          </Button>
          <Button type="primary" className="Home-Btn">
            <Link to='/register'>Register</Link>
          </Button>
        </div>
      </Content>
    );
  }
}