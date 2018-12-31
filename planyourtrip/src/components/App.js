import React, { Component } from 'react';
import { TopBar } from './TopBar';
import { Main } from './Main';
import '../styles/App.css';
import {TOKEN_KEY} from "./constants";
import { Layout } from "antd";


class App extends Component {
  state = {
    isLoggedIn: !!localStorage.getItem(TOKEN_KEY),
  };

  handleLogin = (data) => {
    localStorage.setItem(TOKEN_KEY,data);
    localStorage.setItem("city","null");
    localStorage.setItem("days", 3);
    this.setState({isLoggedIn: true})
  }

  handleLogout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("city");
    localStorage.removeItem("days");
    localStorage.removeItem("data");
    localStorage.removeItem("lat");
    localStorage.removeItem("lng");
    this.setState({isLoggedIn: false})
  }

  render() {
    return (
      <Layout className="App">
        <TopBar isLoggedIn={this.state.isLoggedIn}
                handleLogout={this.handleLogout}/>
        <Main className='Main'
              isLoggedIn={this.state.isLoggedIn}
              handleLogin={this.handleLogin}
              // myState={this.myState}
        />
      </Layout>
    );
  }
}

export default App;