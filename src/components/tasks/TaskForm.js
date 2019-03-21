
import React, { Component } from "react";
import "./Tasks.css";
import TaskAPIManager from "../../modules/TasksManager";

export default class TaskForm extends Component {
  // Set initial state
  state = {
    name: "",
    description: "",
    dueDate: "",
    complete: false,
    userId: sessionStorage.getItem("credentials")

  };

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  /*
        Local method for validation, creating task object, and
        invoking the function reference passed from parent component
     */
  constructTask = evt => {
    evt.preventDefault();
    if (this.state.name === "") {
      window.alert("Please enter a task");
    } else {
      const task = {
        name: this.state.name,
        description: this.state.description,
        dueDate: this.state.dueDate,
        // Make sure the employeeId is saved to the database as a number since it is a foreign key.
        complete: this.state.complete,
        userId: this.state.userId
      };

      // Create the task and redirect user to task list

      this.props.addTask(task)
        .then(() => this.props.history.push("/tasks"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="taskForm">
          <div className="form-group">
            <label htmlFor="name">Task Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="name"
              placeholder="Task"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="description"
              placeholder="Task Description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="dueDate"
            />
          </div>
          <button
            type="submit"
            onClick={this.constructTask}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}