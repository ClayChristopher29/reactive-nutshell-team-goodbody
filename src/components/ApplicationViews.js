import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import NewsList from './news/NewsList'
import NewsForm from './news/NewsForm'
import NewsAPIManager from '../modules/NewsManager'
import NewsDetail from './news/NewsDetail'
import NewsEditForm from './news/NewsEditForm'

import Register from './authentication/register'

import RegisterManager from '../modules/registerManager'
import ChatManager from '../modules/chatManager'

import ChatList from "./chat/chatList";
import ChatForm from "./chat/chatForm"

export default class ApplicationViews extends Component {

  state = {
    users: [],
    events: [],
    tasks: [],
    messages: [],
    news: [],
    friends: []
  }

  addMessage = messageObject =>
    ChatManager.addMessage(messageObject);

  deleteMessage = id => {
      return ChatManager.deleteMessage(id).then(messages =>
        this.setState({
          messages: messages
        })
      );
    };
  updateMessage = (editedMessage) => {
      return ChatManager.put(editedMessage)
        .then(() => ChatManager.getAllMessages())
        .then(messages => {
          this.setState({
            messages: messages
          })
        });
    };

  registerUser = userObject =>
    RegisterManager.postUser(userObject);

  addNewsArticle = newsObject =>
    NewsAPIManager.addNewsArticle(newsObject)
      .then(() => NewsAPIManager.getAllNews()).then(news =>
        this.setState({
          news: news
        })
      );
  deleteNewsArticle = id => {
    return NewsAPIManager.deleteNewsArticle(id).then(news =>
      this.setState({
        news: news
      })
    );
  };
  updateArticle = (editedNewsObject) => {
    return NewsAPIManager.put(editedNewsObject)
      .then(() => NewsAPIManager.getAllNews())
      .then(news => {
        this.setState({
          news: news
        })
      });
  };

  componentDidMount() {
    const newState = {};
    NewsAPIManager.getAllNews()
      .then(news => (newState.news = news))
      .then(() => this.setState(newState));
  }

  render() {
    return (

      <div className="container-div">

        <Route

          exact path="/"
          render={props => {
            return (
              <Register
                {...props}
                registerUser={this.registerUser} />

              // Remove null and return the component which will show news articles
            )
          }}
        />

        <Route exact path="/news" render={(props) => {
          return <NewsList {...props} news={this.state.news} />
        }} />

        <Route path="/news/new" render={props => {
          return (<NewsForm {...props}
            addNewsArticle={this.addNewsArticle}
            news={this.state.news} />
          )
        }} />
        <Route path="/news/:newsId(\d+)" render={(props) => {
          return (<NewsDetail {...props} deleteNewsArticle={this.deleteNewsArticle} news={this.state.news} />
          )
        }} />
        <Route
          path="/news/:newsId(\d+)/edit"
          render={props => {
            return (
              <NewsEditForm
                {...props}
                // news={this.state.news}
                updateArticle={this.updateArticle}
              />
            );
          }}
        />
        <Route
          path="/messages" render={props => {
            return (
              <ChatList
                {...props} messages={this.state.messages}/>,
              <ChatForm
                {...props} addMessage={this.addMessage}/>


            )
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </div>
    );
  }
}
