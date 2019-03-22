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
import UserManager from '../modules/UserManager'
import Login from './authentication/Login'

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

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

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
  getUserEvents = id => {
    return EventAPIManager.getUserEvents(id)
    .then(users => {
      // console.log("Here's is a note", ue)
      //   const eventsByDate = ue.sort(function(a, b) {
      //       return a.date-b.date
      //   })
      //   console.log(eventsByDate)
      this.setState({
        events: users
      })
  })}


  componentDidMount() {
    const newState = {};
    NewsAPIManager.getAllNews()
      .then(news => (newState.news = news))
      .then(UserManager.getAllUsers)
      .then(users => (newState.users = users))
      // .then(chatManager.getAllMessages)
      // .then(messages =>(newState.messages = messages))
      .then(EventAPIManager.getAllEvents)
      .then(events => (newState.events = events))
      .then(TaskAPIManager.getAllTasks)
      .then(tasks => (newState.tasks = tasks))
      .then(() => this.setState(newState));
  }

  render() {
    return (

      <div className="container-div">
{/*
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
        /> */}
<Route
          exact
          path="/news"
          render={props => {
            if (this.isAuthenticated()) {
              return <NewsList {...props} news={this.state.news} />
            } else {
              return <Redirect to="/" />
            }
          }}
        />


        <Route path="/news/new" render={props => {
           if (this.isAuthenticated()) {
          return <NewsForm {...props}
            addNewsArticle={this.addNewsArticle} />
          } else {
            return <Redirect to="/" />
          }
        }} />

<Route
          exact
          path="/"
          render={props => {
            return <Login  {...props} />
          }}
        />
        <Route
          exact
          path="/register"
          render={props => {
            return <Register {...props} getUserEvents={this.getUserEvents} />;
          }}
        />

        <Route exact path="/news/:newsId(\d+)" render={(props) => {
          if (this.isAuthenticated()) {
          return (<NewsDetail {...props} deleteNewsArticle={this.deleteNewsArticle} news={this.state.news} />
          )
        } else {
          return <Redirect to="/" />
        }
        }} />
        <Route
          exact path="/news/:newsId(\d+)/edit"
          render={props => {
            if (this.isAuthenticated()) {
            return (
              <NewsEditForm
                {...props}
                // news={this.state.news}
                updateArticle={this.updateArticle}
              />
            )
          } else {
            return <Redirect to="/" />
            }
          }}
        />
        <Route exact path="/events" render={(props) => {
          if (this.isAuthenticated()) {
          return <EventsList {...props} events={this.state.events} />
        } else {
          return <Redirect to="/" />
          }
        }} />
        <Route exact path="/events/new" render={props => {
          if (this.isAuthenticated()) {
          return (<EventForm {...props}
            addEvent={this.addEvent}
            events={this.state.events} />
          )
        } else {
          return <Redirect to="/" />
          }
        }} />
        <Route exact path="/events/:eventId(\d+)" render={(props) => {
          if (this.isAuthenticated()) {
          return (<EventDetail {...props} deleteEvent={this.deleteEvent} events={this.state.events} />
          )
        } else {
          return <Redirect to="/" />
          }
        }} />
        <Route
          exact path="/events/:eventId(\d+)/edit"
          render={props => {
            if (this.isAuthenticated()) {
            return (
              <EventEditForm
                {...props}
                updateEvent={this.updateEvent}
              />
            )
          } else {
            return <Redirect to="/" />
            }
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
          if (this.isAuthenticated()) {
          return <TaskList {...props} tasks={this.state.tasks} completeTask={this.completeTask}/>
        } else {
          return <Redirect to="/" />
          }
        }} />
        <Route exact path="/tasks/new" render={props => {
          if (this.isAuthenticated()) {
          return (<TaskForm {...props}
            addTask={this.addTask}
            tasks={this.state.tasks} />
          )
        } else {
          return <Redirect to="/" />
          }
        }} />
        <Route path="/tasks/:taskId(\d+)" render={(props) => {
          if (this.isAuthenticated()) {
          return (<TaskDetail {...props} deleteTask={this.deleteTask} tasks={this.state.tasks} />
          )
        } else {
          return <Redirect to="/" />
          }
        }} />
        <Route
          exact path="/tasks/:taskId(\d+)/edit"
          render={props => {
            if (this.isAuthenticated()) {
            return (
              <TaskEditForm
                {...props}
                updateTask={this.updateTask}
              />
            )
          } else {
            return <Redirect to="/" />
            }
          }}
        />

      </div>
    );
  }
}
