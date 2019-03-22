import React, { Component } from 'react';
import ChatManager from "../../modules/chatManager"
import "../appStyles/applicationStyles.css"
import chatForm from "./chatForm"

export default class chatList extends Component {
    state = {
        messageToEdit: ""
    }

    // this function should take the corresponding div container of the edit button
    // clicked on and turn it into an input with a prepopulated message
    constructEditMessage = evt => {
        evt.preventDefault();
        if (this.state.message === "") {
            window.alert("You have not entered a message");
        } else {
            const editedMessage = {
                message: this.state.message,
                id: this.state.messageToEdit.id,
                userId: sessionStorage.getItem("credentials")
                // Make sure the employeeId is saved to the database as a number since it is a foreign key.

            };

            // Create the message and redirect user to animal list

            this.props.updateMessage(editedMessage)
                .then(() => this.props.history.push("/messages"))
                .then(this.setState({
                    messageToEdit: ""
                })
                )
    }};

    handleEditFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange)
    }

    render() {
        return (
            <React.Fragment>
                <div className="messageBoardContainer">
                    <section className="messages">
                        {this.props.messages.map(singleMessage => {
if(singleMessage.userId === sessionStorage.getItem("credentials")){
    if (singleMessage.id === this.state.messageToEdit.id) {
        console.log("Complete and Total success")
        return <div key={singleMessage.id}>
            <div>

                <input
                    type="text"
                    required
                    className="form-control"
                    onChange={this.handleEditFieldChange}
                    id="message"
                    placeholder={this.state.messageToEdit.message}
                />
            </div>


            <button type="button"
                className="btn btn-success"
                id={singleMessage.id}
                onClick={
                    this.constructEditMessage

                }
            >Save
    </button>
        </div>
    }

    else {
        return <div key={singleMessage.id}>
            <div>{singleMessage.user.name}{": "}{singleMessage.message}</div>


            <button type="button"
                className="btn btn-success"
                id={singleMessage.id}
                onClick={() => {
                    this.setState({
                        messageToEdit: singleMessage
                    })
                }}
            >Edit
        </button>
        </div>
    }

}
else {
    return <div key={singleMessage.id}>
             <div>{singleMessage.user.name}{": "}{singleMessage.message}</div>
        </div>
}


                        })}
                    </section>
                </div>
            </React.Fragment>
        )
    }
}




