import React, { Component } from 'react';
import ChatManager from "../../modules/chatManager"
import chatEdit from "./chatEdit"
import chatForm from "./chatForm"

export default class chatList extends Component {
    state = {
        messageToEdit: ""
    }

    // this function should take the corresponding div container of the edit button
    // clicked on and turn it into an input with a prepopulated message
    constructEditMessage = evt => {
        evt.preventDefault();
        if (this.state.title === "") {
          window.alert("You have not entered a message");
        } else {
          const editedMessage = {
            message: this.state.message,
            messageToEdit:""
            // Make sure the employeeId is saved to the database as a number since it is a foreign key.

          };

          // Create the animal and redirect user to animal list

          this.props.updateMessage(editedMessage)
            .then(() => this.props.history.push("/messages"));
        }
      };

    handleEditFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    // handleFieldChange = evt => {
    //     const stateToChange = {};
    //     stateToChange[evt.target.id] = evt.target.value;
    //     this.setState(stateToChange);
    //   };

    render() {
        return (
            <React.Fragment>
                <div className="messageBoardContainer">
                    <section className="messages">
                        {this.props.messages.map(singleMessage => {
                            if (singleMessage.id === this.state.messageToEdit.id) {
                                console.log("Complete and Total success")
                                return <div key={singleMessage.id}>
                                    <div>
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            onChange={this.handleFieldChange}
                                            id="message"
                                            placeholder={this.state.messageToEdit.message}
                                        />
                                    </div>


                                    <button type="button"
                                        className="btn btn-success"
                                        id={singleMessage.id}
                                        onClick={() => {
                                            console.log("This is in the if statement running")

                                            this.setState({
                                                message: singleMessage,
                                                messageToEdit: ""
                                            })

                                        }}
                                    >Save
                            </button>
                                </div>
                            }

                            else {
                                return <div key={singleMessage.id}>
                                    <div>{singleMessage.message}</div>


                                    <button type="button"
                                        className="btn btn-success"
                                        id={singleMessage.id}
                                        onClick={() => {
                                            console.log("This is the else statement running", singleMessage.message)
                                            this.setState({
                                                messageToEdit: singleMessage
                                            })
                                        }}
                                    >Edit
                                </button>
                                </div>
                            }
                        })}
                    </section>
                </div>
            </React.Fragment>
        )
    }
}




