
import React, { Component } from "react"
// import './login.css'
import UserManager from "../../modules/UserManager";
import "../appStyles/applicationStyles.css"

export default class Login extends Component {

    // Set initial state
    state = {

        userEmail: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
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
        window.history.back();
    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()
        if (this.state.userEmail === "") {
            alert("Please enter your registered email address.")
        } else if
        (this.state.password === "") {
            alert("Please enter your password")
        }
        else {
            UserManager.checkUserEmail(this.state.userEmail)
                .then(user => {
                    console.log(user)
                    if (user[0].length === 0) {
                        alert("That email address was not found. Please try to register or use a different email.")
                    } if
                        (user[0].password !== this.state.password) {
                        alert("That password is not correct. Please try again.")
                    } else {
                        sessionStorage.setItem("credentials", user[0].id)
                        this.props.history.push("/news")
                    }
                }
            )
        }
    }


render() {
    return (
        <div>
            <form className="loginForm" onSubmit={this.handleLogin}>
                <h1>Welcome To Nutshell</h1>
                <h2 className="h3 mb-3 font-weight-normal">Please sign in</h2>
                <br></br>

                <label className="emailLabel" htmlFor="userEmail">
                    Email address:
                </label>
                <input onChange={this.handleFieldChange} type="email"
                    id="userEmail"
                    placeholder="Email address"
                    required="" autoFocus="" />
                <br></br>
                <label className="passwordLabel" htmlFor="inputPassword">
                    Password:
                </label>
                <input onChange={this.handleFieldChange} type="password"
                    id="password"
                    placeholder="Password"
                    required="" />
                <br></br>
                <button className="loginBtn" type="submit">
                    Sign in
                        </button>
            </form>
            <section className="loginForm">
                <br></br>
                <h2>-or-</h2>
                <br></br>
                <button className="loginBtn" type="register" onClick={() => this.props.history.push("/register")}
                    id="newUserReg">
                    Register New User
                </button>
            </section>
        </div>
    )
}
}