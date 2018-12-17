import React from 'react';
import logo from '../assets/images/logo.svg';
import { Icon } from "antd";

export class TopBar extends React.Component {
  render() {
    return (
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span className="App-title">Plan Your Trip</span>
        {this.props.isLoggedIn ? (
            <a className="logout" onClick={this.props.handleLogout} >
              <Icon type="logout" className="logout-icon"/>
              Logout</a>)
          : null }
      </header>
    );
  }
}
