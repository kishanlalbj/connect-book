import React, { Component } from "react";
import isEmpty from "./../../utils/isEmpty";

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

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

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  className="rounded-circle"
                  src={profile.user.avatar}
                  alt=""
                />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name} </h1>
              <p className="lead text-center">
                {profile.status}{" "}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company} </span>
                )}
              </p>
              <p>
                {isEmpty(profile.location) ? null : (
                  <span>{profile.location}</span>
                )}
              </p>
              <p>
                {profile.twitter ? (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    href={profile.twitter}
                  >
                    <i className="fab fa-twitter fa-2x" />
                  </a>
                ) : null}

                {profile.facebook ? (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    href={profile.facebook}
                  >
                    <i className="fab fa-facebook fa-2x" />
                  </a>
                ) : null}
                {profile.linkedin ? (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    href={profile.linkedin}
                  >
                    <i className="fab fa-linkedin fa-2x" />
                  </a>
                ) : null}
                {profile.instagram ? (
                  <a
                    className="text-white p-2"
                    target="_blank"
                    href={profile.instagram}
                  >
                    <i className="fab fa-instagram fa-2x" />
                  </a>
                ) : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileHeader;
