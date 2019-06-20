import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { loginUser, registerUser } from "../../actions";
import "./form.css";

class Form extends Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.props.match.path === "/login") {
      this.props.loginUser(this.state.credentials);
      setTimeout(() => {
        this.props.history.push("/");
      }, 5000);
    }
    if (this.props.match.path === "/register") {
      this.props.registerUser(this.state.credentials);
      this.props.history.push("/login");
    }
    // this.props.history.push("/");
    // this.setState({
    //   credentials: {
    //     username: "",
    //     password: ""
    //   }
    // });
  };
  render() {
    return (
      <div className="form-container">
        <form
          className="login-form"
          onSubmit={this.handleSubmit}
          autoComplete="off"
        >
          <input
            onChange={this.handleChange}
            type="text"
            placeholder="username"
            value={this.state.credentials.username}
            name="username"
          />
          <input
            onChange={this.handleChange}
            type="password"
            placeholder="password"
            value={this.state.credentials.password}
            name="password"
          />
          <button type="submit">
            {this.props.match.path === "/login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    );
  }
}

const wrappedLogin = withRouter(Form);

const mapState = state => {
  return state;
};
export default connect(
  mapState,
  { loginUser, registerUser }
)(wrappedLogin);
