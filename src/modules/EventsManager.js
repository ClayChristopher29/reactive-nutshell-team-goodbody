const EventsAPIManager = {
    getAllEvents: () => {
        return fetch ("http://localhost:5002/events")
        .then(events => events.json())
    },

getOneEvent: id =>
fetch(`http://localhost:5002/events/${id}`).then(events => events.json()),
put(editedEvent) {
return fetch(`http://localhost:5002/events/${editedEvent.id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(editedEvent)
}).then(data => data.json());
},

deleteEvent: (id) => {
  return fetch (`http://localhost:5002/events/${id}`, {
  method: "DELETE"
})
  .then(()=> fetch(`http://localhost:5002/events`))
  .then(r=>r.json())
},

addEvent(newEvent) {
    return fetch("http://localhost:5002/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newEvent)
    }).then(r => r.json())
  }
}

export default EventsAPIManager;