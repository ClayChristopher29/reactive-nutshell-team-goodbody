export default {

    getAllMessages: () => {
        return fetch ("http://localhost:5002/messages")
        .then(chats => chats.json())
    },
    getOneMessage: id =>
fetch(`http://localhost:5002/messages/${id}`).then(chats => chats.json()),
put(editedMessage) {
return fetch(`http://localhost:5002/messages/${editedMessage.id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(editedMessage)
}).then(data => data.json());
},
    deleteMessage: (id) => {
        return fetch (`http://localhost:5002/messages/${id}`, {
        method: "DELETE"
      })
        .then(()=> fetch(`http://localhost:5002/messages`))
        .then(r=>r.json())
      },

      addMessage(newMessage) {
          return fetch("http://localhost:5002/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(newMessage)
          }).then(r => r.json())
        }
      }
