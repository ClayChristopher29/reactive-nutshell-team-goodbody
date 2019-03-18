import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import NewsList from './news/NewsList'
import NewsForm from './news/NewsForm'
import NewsAPIManager from '../modules/NewsManager'
import NewsDetail from './news/NewsDetail'

export default class ApplicationViews extends Component {

  state = {
    users: [],
    events: [],
    tasks: [],
    messages: [],
    news: [],
    friends: []
  }

  addNewsArticle = newsObject =>
    NewsAPIManager.postArticle(newsObject)
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
      updateNewsArticle = (editedNewsObject) => {
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
    return NewsAPIManager.getAllNews()
      .then(parsedNews => {
        newState.news = parsedNews;
      })
  }
  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return null
            // Remove null and return the component which will show news articles
          }}
        />

        <Route exact path="/news" render={(props) => {
          return <NewsList {...props} news={this.state.news} />
        }} />
        <Route path="/news/new" render={props => {
          return <NewsForm {...props}
            postNewsArticle={this.postNewsArticle}
            news={this.state.news} />
        }} />
        <Route path="/news/newsId(\d+)" render={(props) => {
          return <NewsDetail {...props} deleteNewsArticle={this.deleteNewsArticle} employees={this.state.news} />
        }} />
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
        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

      </React.Fragment>
    );
  }
}
