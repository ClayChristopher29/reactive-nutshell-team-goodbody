import React, { Component } from "react";
import TaskAPIManager from "../../modules/TasksManager";

export default class TaskEditForm extends Component {
  // Set initial state
  state = {
    name: "",
    description: "",
    dueDate: "",
    complete: false
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  updateExistingTask = evt => {
    evt.preventDefault();

    if (this.state.description === "") {
      window.alert("Please enter a task");
    } else {
      const editedTask = {
        id: this.props.match.params.taskId,
        name: this.state.name,
        description: this.state.description,
        dueDate: this.state.dueDate,
        complete: this.state.complete
      };

      this.props
        .updateTask(editedTask)
        .then(() => this.props.history.push("/tasks"));
    }
  };

  componentDidMount() {
    TaskAPIManager.getOneTask(this.props.match.params.taskId).then(task => {
      this.setState({
        name: task.name,
        description: task.description,
        dueDate: task.dueDate,
        complete: task.complete
      });
    });
  }

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
              value={this.state.name}
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
              value={this.state.description}
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
              value={this.state.dueDate}
            />
          </div>
          <button
            type="submit"
            onClick={this.updateExistingTask}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}