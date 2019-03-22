import React, { Component } from 'react';
import "../appStyles/applicationStyles.css"
import { Link } from "react-router-dom";

class TaskList extends Component {
    handleCheckbox = evt => {
        evt.preventDefault();
        const completeObject = {
            complete: true
        };
        this.props.completeTask(completeObject, this.props.match.params.taskId);
    };

    render() {
        return (
            <React.Fragment>
                <div className="tasksButton">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/tasks/new")
                        }
                        }>
                        Add Task
                    </button>
                </div>
                <section className="tasks">
                    {this.props.tasks.map(task => {
                        return (<div key={task.id} className="tasks-card">

                            <div className="tasks-card-body">

                                <h6 className="task-card-name">{task.name}</h6>
                                <h6 className="task-card-date">{task.dueDate}</h6>
                                <label>Complete?
                                <input
                                        type="checkbox"
                                        onChange={() =>
                                            this.props.completeTask({ complete: true }, task.id)
                                        }
                                    />
                                </label>
                                <Link className="nav-link" to={`/tasks/${task.id}`}>Details</Link>

                            </div>
                        </div>
                        )
                    })
                    }
                </section>
            </React.Fragment>
        );
    }
}

export default TaskList;