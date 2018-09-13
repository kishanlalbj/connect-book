import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { loginUser } from "./../../actions/authActions";
import TextFieldGroup from "./../Input/TextFieldGroup";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      console.log(nextProps.err);
      this.setState({ error: nextProps.err.error });
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  onsubmit = e => {
    e.preventDefault();
    let userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onsubmit.bind(this)}>
                <TextFieldGroup
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={this.state.email}
                  onChange={this.handleChange.bind(this)}
                />

                <TextFieldGroup
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleChange.bind(this)}
                />

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <br />
              <span style={{ color: "red" }}> {this.state.error} </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  err: PropTypes.object.isRequired
};

const mapStateToProp = state => ({
  auth: state.auth,
  err: state.err
});

export default connect(mapStateToProp, { loginUser })(withRouter(Login));
