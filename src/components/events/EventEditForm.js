import React, { Component } from "react";
import EventAPIManager from "../../modules/EventsManager";

export default class EventEditForm extends Component {
  // Set initial state
  state = {
    title: "",
    location: "",
    date: "",
    userId: sessionStorage.getItem("credentials")
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingEvent = evt => {
    evt.preventDefault();

    if (this.state.title === "") {
      window.alert("Please enter a title");
    } else {
      const editedEvent = {
        id: this.props.match.params.eventId,
        title: this.state.title,
        location: this.state.location,
        date: this.state.date,
        userId: this.state.userId
      };

      this.props
        .updateEvent(editedEvent)
        .then(() => this.props.history.push("/events"));
    }
  };

  componentDidMount() {
    EventAPIManager.getOneEvent(this.props.match.params.eventId).then(event => {
      this.setState({
        title: event.title,
        location: event.location,
        date: event.date
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <form className="eventForm">
          <div className="form-group">
            <label htmlFor="Title">Event Title</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="title"
              value={this.state.title}
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
              value={this.state.location}
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
              value={this.state.date}
            />
          </div>
          <button
            type="submit"
            onClick={this.updateExistingEvent}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}