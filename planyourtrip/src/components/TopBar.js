import React from 'react';
import logo from '../assets/images/logo.svg';
import { Icon, Layout } from "antd";
import { Link } from "react-router-dom";

export class TopBar extends React.Component {
  render() {

    const { Header } = Layout;

    return (
      <Header className="App-header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <img src={logo} className="App-logo" alt="logo" />
        <span className="App-title">Plan Your Trip</span>
        {this.props.isLoggedIn ? (
          <Link className="logout" onClick={this.props.handleLogout} to='/home'>
            <Icon type="logout" className="logout-icon"/>
            Logout</Link>)
          : null }
      </Header>
    );
  }
}
