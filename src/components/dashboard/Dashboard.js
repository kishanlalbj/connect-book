import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  getCurrentProfile,
  deleteAccount
} from "./../../actions/profileActions";
import { Link } from "react-router-dom";
import Profile from "./Profile";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
    this.props.getCurrentProfile();
  }
  onDeleteAccount = e => {
    e.preventDefault();

    if (
      window.confirm("Are you really wanna delete..?? This can't be reversed")
    ) {
      this.props.deleteAccount(this.props.history);
      // this.props.history.push("/login");
    }
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardContent;
    if (profile === null || loading)
      dashboardContent = (
        <h4 style={{ margin: "auto", display: "block" }}>Loading...</h4>
      );
    else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              welcome {" "}
              <Link to={`/profiles/${profile.handle}`}>{user.name}</Link>
            </p>
            <Profile />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteAccount.bind(this)}
              type="button"
              className="btn btn-danger"
            >
              Delete Account
            </button>
          </div>
        );
      } else {
        dashboardContent = (
          <div>
            <p className="lead text-muted">welcome {user.name}</p>
            <p>Setup your profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              SetUp Profile
            </Link>
          </div>
        );
      }
    }
    return <div>{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
