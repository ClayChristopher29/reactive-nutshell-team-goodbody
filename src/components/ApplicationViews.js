import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";

import Register from './authentication/register'

import RegisterManager from './modules/registerManager'

export default class ApplicationViews extends Component {

  state={
      // what goes in state in an application with multiple functionalities and components???
  }

  registerUser = userObject =>
RegisterManager.postUser(userObject);

  // componentDidMount() {

  // }

  render() {
    return (
      <React.Fragment>

        <Route
          path="/"
          render={props => {
            return (
              <Register
              {...props}
              registerUser={this.registerUser}/>
            // Remove null and return the component which will show news articles
            )}}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
