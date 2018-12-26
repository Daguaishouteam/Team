import React from 'react';
import logo from '../assets/images/logo.svg';
import { Icon, Layout } from "antd";
import {Link, Redirect} from "react-router-dom";

export class TopBar extends React.Component {

  getRedirect = () => {
    return this.props.isLoggedIn ?
      <Redirect to="/city" /> :
      <Redirect to="/home" />
  }

  render() {

    const { Header } = Layout;

    return (
      <Header className="App-header" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <img src={logo} className="App-logo" alt="logo" />
        <span className="App-title">Plan Your Trip</span>
        {this.props.isLoggedIn ? (
          <div className="logout-manage">
            <Link className="home" to='/city'>
              <Icon type="home" className="topbar-icon"/>
              Home</Link>
            <Link className="account" to='/account'>
                <Icon type="user" className="topbar-icon"/>
                Account Manage</Link>
            <Link className="logout" onClick={this.props.handleLogout} to='/home'>
                <Icon type="logout" className="topbar-icon"/>
                Logout</Link>
          </div>
          )
          : null }
      </Header>
    );
  }
}
