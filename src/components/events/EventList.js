import React, { Component } from 'react';
import "./Events.css"
import { Link } from "react-router-dom";

class EventsList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="eventsButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/events/new")
                        }
                        }>
                        Add Event
                    </button>
                </div>
                <section className="events">
                    {
                        this.props.events.map(events =>
                            <div key={events.id} className="events-card">
                                <div className="events-card-body">
                                    <h5 className="events-card-title">
                                        {events.title}
                                        <br />
                                        {events.date}

                                        <Link className="nav-link" to={`/events/${events.id}`}>Details</Link>
                                    </h5>
                                </div>
                            </div>
                        )
                    }
                </section>
            </React.Fragment>
        );
    }
}

export default EventsList;