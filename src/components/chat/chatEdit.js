import React, { Component } from "react";
import chatManager from "../../modules/chatManager";

export default class NewsEditForm extends Component {
  // Set initial state
  state = {
    message: "",
    messageToEdit: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingMessage = evt => {
    evt.preventDefault();

    if (this.state.message === "") {
      window.alert("Please enter a message");
    } else {
      const editedMessage = {
        message: this.state.message,
        id: this.props.match.params.id,

      };

      this.props
        .updateMessage(editedMessage)
        .then(() => this.props.history.push("/messages"));
    }
  };

  componentDidMount() {
    chatManager.getOneMessage(this.props.match.params.id).then(chat => {
      this.setState({
        message: chat.message,

      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <form className="messageForm">
          <div className="form-group">
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="editMessageContent"
              value={this.state.message}
            />
          </div>
          <button
            type="submit"
            onClick={this.updateExistingArticle}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}