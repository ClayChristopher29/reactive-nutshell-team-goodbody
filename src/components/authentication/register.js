import React, {Component} from "react";
import RegisterManager from '../../modules/registerManager'
export default class Register extends Component {
// set initial state for Registration
state = {
    email: "",
    userName: "",
    rememberMe: false,
    errorMessage: ""
};
 // Update state whenever an input field is edited
// handleFieldChange = (evt) => {
//     const stateToChange = {};
//     if (evt.target.type === "checkbox") {
//     stateToChange[evt.target.id] = evt.target.checked;
//     } else {
//     stateToChange[evt.target.id] = evt.target.value;
// }
//     this.setState(stateToChange);
// }

handleFieldChange = evt => {
    const stateToChange = {};
    // If the input was a checkbox, we want to store a boolean in state so the syntax is a lil bit different
    if (evt.target.type === "checkbox") {
      stateToChange[evt.target.id] = evt.target.checked;
    } else {
      stateToChange[evt.target.id] = evt.target.value;
    }
    this.setState(stateToChange);
  };


// Simplistic handler for login submit
handleLogin = (e) => {
    e.preventDefault()

        /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
sessionStorage.setItem(
"credentials",
JSON.stringify({
    email: this.state.email,
    userName: this.state.userName

})
)
}

registerUser = evt => {
    evt.preventDefault();

const userToPost = {
    email: this.state.email,
    userName: this.state.userName
}

    // RegisterManager.getByEmail(this.state.email).then(user => {
    //     if (user.length > 0) {
    //         const errorMessage =
    //           "Sorry, that email already exists.";
    //         this.setState({ errorMessage: errorMessage });
    //       } else {
            // If the email isn't in the db, go ahead and register
            this.props.registerUser(userToPost).then(user => {
              console.log(user);
              sessionStorage.setItem("credentials", JSON.stringify(user.id));
              this.props.history.push("/");

            });
          }
    //     });
    //   };




render() {
    return (
        <form onSubmit={this.handleLogin}>
        <h1 className="h3 mb-3 font-weight-normal">Welcome to Nutshell! Please Register</h1>
        <label htmlFor="inputEmail">
            Email Address
        </label>
        <input onChange={this.handleFieldChange} type="email"
            id="email"
            placeholder="Email Address"
            required="" autoFocus="" />
        <label htmlFor="inputUserName">
            UserName
        </label>
        <input onChange={this.handleFieldChange} type="text"
            id="userName"
            placeholder="User Name"
            required=""/>
        <button
         type="submit"
         onClick={this.registerUser}>
            Sign in
        </button>
        </form>
    )
}
}



