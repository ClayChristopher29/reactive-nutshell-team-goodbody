import React, { Component } from "react"
import "./Events.css"



export default class EventDetail extends Component {
  render() {
    /*
        Using the route parameter, find the event that the
        user clicked on by looking at the `this.props.events`
        collection that was passed down from ApplicationViews
    */
    const events = this.props.events.find(a => a.id === parseInt(this.props.match.params.eventId)) || {};

    return (
      <section className="events">
        <div key={events.id} className="event-card">
          <div className="event-card-body">
            <h4 className="event-card-title">
              {events.title}
            </h4>
            <h6 className="event-card-title">{events.location}</h6>
            <h6 className="event-card-title">{events.date}</h6>

            <button
              href="#"
              className="btn btn-danger"
              onClick={() =>
                this.props
                  .deleteEvent(events.id)
                  .then(() => this.props.history.push("/events"))
              }
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push(
                  `/events/${events.id}/edit`
                );
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </section>
    );
  }
}