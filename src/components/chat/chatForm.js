
import React, { Component } from "react";
// import "./News.css";

export default class ChatForm extends Component {
  // Set initial state
  state = {
    message: "",
    messageToEdit: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating message object, and
        invoking the function reference passed from parent component
     */
  constructMessage = evt => {
    evt.preventDefault();
    if (this.state.title === "") {
      window.alert("You have not entered a message");
    } else {
      const chatMessage = {
        message: this.state.message,
        userId: sessionStorage.getItem("credentials")
        // Make sure the employeeId is saved to the database as a number since it is a foreign key.

      };

      // Create the animal and redirect user to animal list

      this.props.addMessage(chatMessage)
        .then(() => this.props.history.push("/messages"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="MessageForm">
          <div className="form-group">

            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="message"
              placeholder="Enter Message"
            />
          </div>

          <button
            type="submit"
            onClick={this.constructMessage}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}