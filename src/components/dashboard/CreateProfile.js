import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "./../Input/TextFieldGroup";
import { Link, withRouter } from "react-router-dom";
import TextAreaFieldGroup from "./../Input/TextAreaFieldGroup";
import SelectListGroup from "./../Input/SelectListGroup";
import isEmpty from "./../../utils/isEmpty";
import {
  createProfile,
  getCurrentProfile
} from "./../../actions/profileActions";

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
      error: "",
      mode: ""
    };
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getCurrentProfile();
    // console.log(this.props.profile.profile);
    if (this.props.profile.profile === null) {
      console.log("loading");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      this.setState({ error: nextProps.error });
    }

    if (
      nextProps.profile.profile != null &&
      Object.keys(nextProps.profile.profile).length > 0
    ) {
      console.log("NEXT PROPS", nextProps.profile.profile);
      const profile = nextProps.profile.profile;
      profile.handle = !isEmpty(profile.handle) ? profile.handle : "";

      profile.company = !isEmpty(profile.company) ? profile.company : "";
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.status = !isEmpty(profile.status) ? profile.status : "";
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";

      this.setState({
        mode: "Edit",
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        githubusername: profile.githubusername,
        bio: profile.bio,
        skills: profile.skills.join(","),
        twitter: profile.twitter,
        facebook: profile.facebook,
        instagram: profile.instagram,
        linkedin: profile.linkedin
      });
    } else {
      this.setState({ mode: "Create" });
    }
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    let profile = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      instagram: this.state.instagram
    };
    console.log("SUBMITTED", profile);
    this.props.createProfile(profile, this.props.history);
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
              <h1 className="display-4 text-center">
                {this.state.mode} Your Profile
              </h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required field</small>
              <form onSubmit={this.onSubmit.bind(this)}>
                <TextFieldGroup
                  type="text"
                  placeholder="* Profile handle"
                  name="handle"
                  value={this.state.handle}
                  info="A unique handle for your profile URL. Your full name company name  nickname etc"
                  onChange={this.handleChange.bind(this)}
                />
                <SelectListGroup
                  placeholder="status"
                  options={[
                    { label: "* Select your role ", value: "0" },
                    { label: "Junior Developer", value: "Junior developer" },
                    { label: "Senior Developer", value: "Senior Developer" },
                    { label: "Developer", value: "Developer" },
                    { label: "Manager", value: "Manager" },
                    { label: "Student", value: "Student" },
                    { label: "Intern", value: "Intern" },
                    { label: "Other", value: "Other" }
                  ]}
                  info="Your Role"
                  name="status"
                  value={this.state.status}
                  onChange={this.handleChange.bind(this)}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  info="Could be your own company or one you work for"
                  onChange={this.handleChange.bind(this)}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  info="Could be where you work or reside"
                  onChange={this.handleChange.bind(this)}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  info="Could be your own or company website"
                  onChange={this.handleChange.bind(this)}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Skills"
                  name="skills"
                  value={this.state.skills}
                  info="Please use comma seperated values"
                  onChange={this.handleChange.bind(this)}
                />
                <TextFieldGroup
                  type="text"
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  info="If you want your latest repos and a Github link include your username"
                  onChange={this.handleChange.bind(this)}
                />

                <TextAreaFieldGroup
                  name="bio"
                  onChange={this.handleChange.bind(this)}
                  placeholder="A short bio of yourself"
                  info="Tell us a little about yourself"
                  value={this.state.bio}
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() =>
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }))}
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
                        value={this.state.twitter}
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
                        value={this.state.facebook}
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
                        placeholder="linkedin Profile URL"
                        name="linkedin"
                        value={this.state.linkedin}
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
                        value={this.state.instagram}
                        onChange={this.handleChange.bind(this)}
                      />
                    </div>
                  </div>
                ) : null}
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
              <span style={{ color: "red" }}>{this.state.error}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
CreateProfile.propTypes = {
  profile: PropTypes.object,
  error: PropTypes.string,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  err: state.err,
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile)
);
