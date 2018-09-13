import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "./../Input/TextFieldGroup";
import { Link } from "react-router-dom";
class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      handle: "",
      company: "",
      website: "",
      location: "",
      status: "",
      skills: "",
      githubusername: "",
      bio: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      instagram: "",
      error: ""
    };
  }
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    console.log(this.state);
  };
  render() {
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit.bind(this)}>
                <TextFieldGroup
                  type="text"
                  placeholder="* Profile handle"
                  name="handle"
                  info="A unique handle for your profile URL. Your full name company name  nickname etc"
                  onChange={this.handleChange.bind(this)}
                />
                <div className="form-group">
                  <select
                    className="form-control form-control-lg"
                    name="status"
                  >
                    <option value="0">* Select Professional Status</option>
                    <option value="Developer">Developer</option>
                    <option value="Junior Developer">Junior Developer</option>
                    <option value="Senior Developer">Senior Developer</option>
                    <option value="Manager">Manager</option>
                    <option value="Student or Learning">
                      Student or Learning
                    </option>
                    <option value="Instructor">Instructor or Teacher</option>
                    <option value="Intern">Intern</option>
                    <option value="Other">Other</option>
                  </select>
                  <small className="form-text text-muted">
                    Give us an idea of where you are at in your career
                  </small>
                </div>
                <TextFieldGroup
                  type="text"
                  placeholder="Company"
                  name="company"
                  info="Could be your own company or one you work for"
                  onChange={this.handleChange.bind(this)}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Location"
                  name="location"
                  info="Could be where you work or reside"
                  onChange={this.handleChange.bind(this)}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Website"
                  name="website"
                  info="Could be your own or company website"
                  onChange={this.handleChange.bind(this)}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Skills"
                  name="skills"
                  info="Please use comma seperated values"
                  onChange={this.handleChange.bind(this)}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Github Username"
                  name="githubusername"
                  info="If you want your latest repos and a Github link include your username"
                  onChange={this.handleChange.bind(this)}
                />

                <div className="form-group">
                  <textarea
                    className="form-control form-control-lg"
                    placeholder="A short bio of yourself"
                    name="bio"
                    onChange={this.handleChange.bind(this)}
                  />
                  <small className="form-text text-muted">
                    Tell us a little about yourself
                  </small>
                </div>

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => this.setState({ displaySocialInputs: true })}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {this.state.displaySocialInputs ? (
                  <div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fab fa-twitter" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Twitter Profile URL"
                        name="twitter"
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fab fa-facebook" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Facebook Page URL"
                        name="facebook"
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fab fa-linkedin" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Linkedin Profile URL"
                        name="linkedin"
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fab fa-instagram" />
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Instagram Page URL"
                        name="instagram"
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                ) : null}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  error: PropTypes.string.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  err: state.err
});
export default connect(mapStateToProps)(CreateProfile);
