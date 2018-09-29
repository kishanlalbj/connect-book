import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import TextAreaFieldGroup from "./../Input/TextAreaFieldGroup";
import TextFieldGroup from "./../Input/TextFieldGroup";
import { addEducation } from "./../../actions/profileActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldOfStudy: "",
      from: "",
      to: "",
      description: "",
      current: false,
      disabled: false,
      error: ""
    };
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.err) {
      this.setState({ error: nextProps.err.error });
    }
  }
  handleChange = e => {
    if (e.target.name === "current") {
      this.setState(prevState => ({
        disabled: !prevState.disabled,
        current: !prevState.current
      }));
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  submit = e => {
    e.preventDefault();
    const eduData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldOfStudy: this.state.fieldOfStudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };
    this.props.addEducation(eduData, this.props.history);
  };
  render() {
    return (
      <div className="section add-education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Add Your Education</h1>
              <p className="lead text-center">
                Add any developer/programming positions that you have had in the
                past
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.submit.bind(this)}>
                <TextFieldGroup
                  type="text"
                  placeholder="* School"
                  name="school"
                  value={this.state.school}
                  onChange={this.handleChange.bind(this)}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="* Degree"
                  name="degree"
                  value={this.state.degree}
                  onChange={this.handleChange.bind(this)}
                />
                <TextFieldGroup
                  type="text"
                  value={this.state.fieldOfStudy}
                  placeholder="* Field Of Study"
                  name="fieldOfStudy"
                  onChange={this.handleChange.bind(this)}
                />
                <h6>From Date</h6>
                <TextFieldGroup
                  type="date"
                  placeholder="from"
                  value={this.state.from}
                  name="from"
                  onChange={this.handleChange.bind(this)}
                />
                <h6>To Date</h6>
                <TextFieldGroup
                  placeholder="To"
                  type="date"
                  name="to"
                  onChange={this.handleChange.bind(this)}
                  disabled={this.state.disabled}
                  value={this.state.to}
                />
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="current"
                    value={this.state.current}
                    onChange={this.handleChange.bind(this)}
                  />
                  <label className="form-check-label">Current education</label>
                </div>

                <TextAreaFieldGroup
                  name="description"
                  placeholder="Education Details"
                  info="Something about your education"
                  value={this.state.description}
                  onChange={this.handleChange.bind(this)}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <span style={{ color: "red" }}> {this.state.error} </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  error: PropTypes.string
};
const mapStateToProps = state => ({
  auth: state.auth,
  err: state.err,
  profile: state.profile
});

export default connect(mapStateToProps, { addEducation })(
  withRouter(AddEducation)
);
