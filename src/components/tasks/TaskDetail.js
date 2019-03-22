import React, { Component } from "react"
import "../appStyles/applicationStyles.css"



export default class TaskDetail extends Component {
  render() {
    /*
        Using the route parameter, find the event that the
        user clicked on by looking at the `this.props.events`
        collection that was passed down from ApplicationViews
    */
    const task = this.props.tasks.find(a => a.id === parseInt(this.props.match.params.taskId)) || {};

    return (
      <section className="task">
        <div key={task.id} className="task-card">
          <div className="task-card-body">
            <h6 className="task-card-name">{task.name}</h6>
            <h6 className="task-card-description">{task.description}</h6>
            <h6 className="task-card-date">{task.dueDate}</h6>



            <button
              href="#"
              className="btn btn-danger"
              onClick={() =>
                this.props
                  .deleteTask(task.id)
                  .then(() => this.props.history.push("/tasks"))
              }
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => {
                this.props.history.push(
                  `/tasks/${task.id}/edit`
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