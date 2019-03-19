import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ChatList from "../chat/chatList";
import ChatEdit from "../chat/chatEdit";
import ChatForm from "../chat/chatForm";

export default class Chat extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default Nutshell;