import React from 'react';
import { Register } from "./Register";
import { Login } from "./Login";
import { Home } from "./Home";
import { City} from "./City";
import { Plan} from "./Plan";
import { Show } from "./Show";
import { Route, Switch, Redirect } from 'react-router-dom';

export class Main extends React.Component {
  getRedirect = () => {
    return this.props.isLoggedIn ?
      <Redirect to="/home" /> :
      <Redirect to="/login" />
  }

  getLogin = () => {
    return this.props.isLoggedIn ?
      <Redirect to='home' /> :
      <Login handleLogin={this.props.handleLogin}/>
  }

  getHome = () => {
    return this.props.isLoggedIn ?
      <Home /> :
      <Redirect to="/login" />;
  }

  getShow = () => {
        return <Show />;
  }

  render() {
    return(
      <div className="main">
        <Switch>
          <Route exact path="/" render={this.getLogin} />
          <Route path="/login" render={this.getLogin}/>
          <Route path="/register" component={Register}/>
          <Route path="/home" render={this.getHome}/>
          <Route exact path='/city' component={ City }/>
          <Route exact path='/plan' component={ Plan }/>
          <Route exact paht='/show' render={this.getShow}/>
          <Route render={this.getRedirect}/>
        </Switch>
      </div>
    );
  }
}
