
import React, { Component } from "react";
import "./News.css";

export default class NewsForm extends Component {
  // Set initial state
  state = {
    title: "",
    synopsis: "",
    url: "",
    newsId: ""
  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating animal object, and
        invoking the function reference passed from parent component
     */
  constructNewsArticle = evt => {
    evt.preventDefault();
    if (this.state.news === "") {
      window.alert("Please enter a news article");
    } else {
      const news = {
        title: this.state.title,
        synopsis: this.state.synopsis,
        url: this.state.url,
        // Make sure the employeeId is saved to the database as a number since it is a foreign key.
        newsId: parseInt(this.state.newsId)
      };

      // Create the animal and redirect user to animal list
      this.props.addNewsArticle(news)
        .then(() => this.props.history.push("/news"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="NewsForm">
          <div className="form-group">
            <label htmlFor="title">Article Title</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="title"
              placeholder="Article Title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="synopsis">Synopsis</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="synopsis"
              placeholder="synopsis"
            />
          </div>
          <div className="form-group">
            <label htmlFor="url">URL</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="url"
              placeholder="url"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructNewsArticle}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}