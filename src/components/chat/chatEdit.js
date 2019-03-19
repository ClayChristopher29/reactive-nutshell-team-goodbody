import React, { Component } from "react";
import chatManager from "../../modules/chatManager";

export default class NewsEditForm extends Component {
  // Set initial state
  state = {
    message: "",
    messageId: "",
    userId: ""
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
        id: this.props.match.params.newsId,
        title: this.state.title,
        synopsis: this.state.synopsis,
        url: this.state.url,
        newsId: parseInt(this.state.newsId)
      };

      this.props
        .updateArticle(editedMessage)
        .then(() => this.props.history.push("/news"));
    }
  };

  componentDidMount() {
    chatManager.getOneMessage(this.props.match.params.messageId).then(chat => {
      this.setState({
        message: chat.message,
        messageId: chat.messageId,
        userId: chat.userId
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