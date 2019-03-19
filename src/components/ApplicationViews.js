import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import NewsList from './news/NewsList'
import NewsForm from './news/NewsForm'
import NewsAPIManager from '../modules/NewsManager'
import NewsDetail from './news/NewsDetail'
import NewsEditForm from './news/NewsEditForm'
import EventEditForm from './events/EventEditForm'
import EventDetail from './events/EventDetail'
import EventForm from './events/EventForm'
import EventsList from './events/EventList'
import EventAPIManager from '../modules/EventsManager'

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
  addEvent = eventObject =>
  EventAPIManager.addEvent(eventObject)
    .then(() => EventAPIManager.getAllEvents()).then(events =>
      this.setState({
        events: events
      })
    );
deleteEvent = id => {
  return EventAPIManager.deleteEvent(id).then(events =>
    this.setState({
      events: events
    })
  );
};
updateEvent = (editedEventObject) => {
  return EventAPIManager.put(editedEventObject)
    .then(() => EventAPIManager.getAllEvents())
    .then(events => {
      this.setState({
        events: events
      })
    });
};

  componentDidMount() {
    const newState = {};
    NewsAPIManager.getAllNews()
      .then(news => (newState.news = news))
      .then(EventAPIManager.getAllEvents())
      .then(events => (newState.events = events))
      .then(() => this.setState(newState));
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
          return (<NewsForm {...props}
            addNewsArticle={this.addNewsArticle}
            news={this.state.news} />
          )
        }} />
        <Route exact path="/news/:newsId(\d+)" render={(props) => {
          return (<NewsDetail {...props} deleteNewsArticle={this.deleteNewsArticle} news={this.state.news} />
          )}} />
        <Route
          exact path="/news/:newsId(\d+)/edit"
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
        <Route exact path="/events" render={(props) => {
          return <EventsList {...props} events={this.state.events} />
        }} />
        <Route exact path="/events/new" render={props => {
          return (<EventForm {...props}
            addEvent={this.addEvent}
            events={this.state.events} />
          )
        }} />
        <Route exact path="/events/:eventId(\d+)" render={(props) => {
          return (<EventDetail {...props} deleteEvent={this.deleteEvent} events={this.state.events} />
          )}} />
        <Route
          exact path="/events/:eventId(\d+)/edit"
          render={props => {
            return (
              <EventEditForm
                {...props}
                updateEvent={this.updateEvent}
              />
            );
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
