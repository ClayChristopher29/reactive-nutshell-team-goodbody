import React, {Component} from 'react';

export default class chatList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="messageBoardContainer">
                <section className="messages">
                {this.props.messages.map(singleMessage => (
                    <div key={singleMessage.id}>
                </div>)
                )}

                </section>
                <button type="button"
                 className="btn btn-success"
                 onClick={() => {
                     this.props.history.push("/messages/new")
                 }}>Send Message</button>
                </div>
            </React.Fragment>
        )
    }
}



