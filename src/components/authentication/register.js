import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
// import InputMask from 'react-input-mask';
// import "./login.css";
import userAPIManager from '../../modules/UserManager'
import "../appStyles/applicationStyles.css"
export default class NewUserReg extends Component {
    // Set initial state
    state = {
        userName: "",
        userEmail: "",
        userPassword: "",
        passwordCheck: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        // console.log(evt.target.checked)
        // console.log(evt.target.id)
        this.setState(stateToChange)
    }

    handleCheckbox = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.checked
        this.setState(stateToChange)
    }

    goBack() {
        window.history.back()
    }

    handleRegister = e => {
        e.preventDefault()

        if (this.state.userName === "") {
            window.alert("Please enter your user name.")
        } else if (this.state.userEmail === "") {
            window.alert("Please enter your email address.")
        } else if
            (this.state.userPassword !== this.state.passwordCheck) {
            window.alert("Passwords do not match! Please try again")
        }
        if (this.state.userEmail !== "" && this.state.userName !== "" && this.state.userPassword === this.state.passwordCheck)
            var counter = 0
        userAPIManager.getAllUsers().then(users => {
            users.forEach(user => {
                if (
                    user.userName === this.state.userName ||
                    user.email === this.state.userEmail
                ) {
                    counter = counter + 1;
                    alert(
                        "The username or email you entered has already been used, please choose a different username and email"
                    )
                }
            })

            //if username and email are unique then counter will be 0
            if (counter < 1) {
                const newUser = {
                    name: this.state.userName,
                    email: this.state.userEmail,
                    password: this.state.userPassword
                }
                userAPIManager.postUser(newUser).then(user => {
                    if (this.state.rememberMe === true) {

                        // console.log(pu)
                        localStorage.setItem("credentials", user.id)
                        sessionStorage.setItem("credentials", user.id)
                        this.props.getUserEvents(parseInt(sessionStorage.getItem("credentials")))
                        this.props.history.push("/events")

                    } else {
                        sessionStorage.setItem("credentials", user.id)
                        this.props.getUserEvents(parseInt(sessionStorage.getItem("credentials")))
                        this.props.history.push("/events")
                    }
                }
            )
        }
    })
}

    render() {
        return (
            <form className="loginForm" onSubmit={this.handleRegister}>
                <h1>Welcome to Nutshell!</h1>
                <h2 className="h3 mb-3 font-weight-normal">Register New User</h2>
                <br />

                <label htmlFor="userName">User Name</label>
                <input
                    onChange={this.handleFieldChange}
                    type="text"
                    id="userName"
                    placeholder="User Name"
                    required=""
                    autoFocus=""
                />
                <br />

                <label htmlFor="userEmail">Email Address</label>
                <input
                    onChange={this.handleFieldChange}
                    type="email"
                    id="userEmail"
                    placeholder="Email Address"
                    required=""
                />
                <br />

                <label htmlFor="userPassword">Choose A Password</label>
                <input
                    onChange={this.handleFieldChange}
                    type="password"
                    id="userPassword"
                    placeholder="Enter Password"
                    required=""
                />
                <br />

                <label htmlFor="passwordCheck">Re-Enter Password</label>
                <input
                    onChange={this.handleFieldChange}
                    type="password"
                    id="passwordCheck"
                    placeholder="Re-Enter Password"
                    required=""
                />
                <br />
                <label htmlFor="rememberMe">
                    Remember Me
                </label>
                <input onChange={this.handleCheckbox} type="checkbox"
                    id="rememberMe"
                    placeholder=""
                    required="" autoFocus="" />
                <br />
                <br />
                <br />

                <button type="submit">Register New User </button>
            </form>
        )
    }
}