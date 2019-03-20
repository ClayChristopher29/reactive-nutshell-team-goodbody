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

import TaskDetail from './tasks/TaskDetail'
import TaskEditForm from './tasks/TaskEditForm'
import TaskForm from './tasks/TaskForm'
import TaskList from './tasks/TaskList'
import TaskAPIManager from '../modules/TasksManager'

import Register from './authentication/register'

import RegisterManager from '../modules/registerManager'
import ChatManager from '../modules/chatManager'

import ChatList from "./chat/chatList"
import ChatForm from "./chat/chatForm"
import Chat from "./chat/chat"
import chatManager from "../modules/chatManager";

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
    ChatManager.addMessage(messageObject).then(() =>
    chatManager.getAllMessages()).then(messages =>
      this.setState({
        messages: messages
      })
    );

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
  addTask = taskObject =>
    TaskAPIManager.addTask(taskObject)
      .then(() => TaskAPIManager.getAllTasks()).then(tasks =>
        this.setState({
          tasks: tasks
        })
      );
  deleteTask = id => {
    return TaskAPIManager.deleteTask(id).then(tasks =>
      this.setState({
        tasks: tasks
      })
    );
  };
  updateTask = (editedTaskObject) => {
    return TaskAPIManager.put(editedTaskObject)
      .then(() => TaskAPIManager.getAllTasks())
      .then(tasks => {
        this.setState({
          tasks: tasks
        })
      });
  };
  completeTask = (taskObject, taskId) => {
    return TaskAPIManager.completeTask(taskObject, taskId)
    .then(() => TaskAPIManager.getAllTasks())
    .then(tasks => this.setState({
      tasks: tasks
    }))
  }
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
      .then(chatManager.getAllMessages)
      .then(messages =>(newState.messages = messages))
      .then(EventAPIManager.getAllEvents)
      .then(events => (newState.events = events))
      .then(TaskAPIManager.getAllTasks)
      .then(tasks => (newState.tasks = tasks))
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
        <Route exact path="/news/:newsId(\d+)" render={(props) => {
          return (<NewsDetail {...props} deleteNewsArticle={this.deleteNewsArticle} news={this.state.news} />
          )
        }} />
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
          )
        }} />
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
            return (
              <Chat
              {...props}
              messages={this.state.messages}
              addMessage={this.addMessage}
              deleteMessage={this.deleteMessage}
              updateMessage={this.updateMessage}
              />
            )
            // Remove null and return the component which will show the messages
          }}
        />

        <Route exact path="/tasks" render={(props) => {
          return <TaskList {...props} tasks={this.state.tasks} completeTask={this.completeTask}/>
        }} />
        <Route exact path="/tasks/new" render={props => {
          return (<TaskForm {...props}
            addTask={this.addTask}
            tasks={this.state.tasks} />
          )
        }} />
        <Route path="/tasks/:taskId(\d+)" render={(props) => {
          return (<TaskDetail {...props} deleteTask={this.deleteTask} tasks={this.state.tasks} />
          )
        }} />
        <Route
          exact path="/tasks/:taskId(\d+)/edit"
          render={props => {
            return (
              <TaskEditForm
                {...props}
                updateTask={this.updateTask}
              />
            );
          }}
        />

      </div>
    );
  }
}
