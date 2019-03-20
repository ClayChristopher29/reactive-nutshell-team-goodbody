
import React, { Component } from "react";
import "./Events.css";
import EventsAPIManager from '../../modules/EventsManager'

export default class EventForm extends Component {
  // Set initial state
  state = {
    title: "",
    location: "",
    date: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating event object, and
        invoking the function reference passed from parent component
     */
  constructEvent = evt => {
    evt.preventDefault();
    if (this.state.title === "") {
      window.alert("Please enter an event");
    } else {
      const event = {
        title: this.state.title,
        location: this.state.location,
        date: this.state.date
      };

      // Create the event and redirect user to event list

      this.props.addEvent(event)
        .then(() => this.props.history.push("/events"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="eventsForm">
          <div className="form-group">
            <label htmlFor="title">Event Title</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="title"
              placeholder="Event Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="location"
              placeholder="Location"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="date"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructEvent}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}