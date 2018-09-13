import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCurrentProfile } from "./../../actions/profileActions";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }
  componentDidMount() {
    this.props.getCurrentProfile();
  }

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
        dashboardContent = <h4>{profile.status}</h4>;
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
    return (
      <div>
        <h1>DASHBOARD</h1>
        {dashboardContent}
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
