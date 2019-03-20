const TaskAPIManager = {
    getAllTasks: () => {
        return fetch ("http://localhost:5002/tasks")
        .then(tasks => tasks.json())
    },

getOneTask: id =>
fetch(`http://localhost:5002/tasks/${id}`).then(task => task.json()),
put(editedTask) {
return fetch(`http://localhost:5002/tasks/${editedTask.id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(editedTask)
}).then(data => data.json());
},

deleteTask: (id) => {
  return fetch (`http://localhost:5002/tasks/${id}`, {
  method: "DELETE"
})
  .then(()=> fetch(`http://localhost:5002/tasks`))
  .then(r=>r.json())
},

addTask(newTask) {
    return fetch("http://localhost:5002/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTask)
    }).then(r => r.json())
  },
  completeTask(completeTask, taskId) {
    return fetch(`http://localhost:5002/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(completeTask)
    })

}
}

export default TaskAPIManager;