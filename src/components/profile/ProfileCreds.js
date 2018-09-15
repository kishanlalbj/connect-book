import React, { Component } from "react";
import Moment from "react-moment";

class ProfileCreds extends Component {
  render() {
    const { education, experience } = this.props;
    const expitems = experience.map(exp => {
      return (
        <li key={exp._id} className="list-group-item">
          <h4>{exp.company}</h4>
          <p>
            <Moment format="MMM YYYY">{exp.from}</Moment> - {" "}
            {exp.to === null ? (
              " Now"
            ) : (
              <Moment format="MMM YYYY">{exp.to}</Moment>
            )}
          </p>
          <p>
            {" "}
            <strong> Position </strong>
            {exp.title}{" "}
          </p>
          <p>
            {exp.location === "" ? null : (
              <span>
                <strong>Location </strong>
                {exp.location}
              </span>
            )}
          </p>
          <p>
            {exp.description === "" ? null : (
              <span>
                <strong>Description </strong>
                {exp.description}
              </span>
            )}
          </p>
        </li>
      );
    });

    const eduitems = education.map(edu => {
      return (
        <li key={edu._id} className="list-group-item">
          <h4>{edu.school}</h4>
          <p>
            <Moment format="MMM YYYY">{edu.from}</Moment> - {" "}
            {edu.to === null ? (
              " Now"
            ) : (
              <Moment format="MMM YYYY">{edu.to}</Moment>
            )}
          </p>
          <p>
            <strong>Degree </strong>
            {edu.degree}
          </p>
          <p>
            {edu.fieldOfStudy === "" ? null : (
              <span>
                <strong>Field Of Study </strong>
                {edu.fieldOfStudy}
              </span>
            )}
          </p>
          <p>
            {edu.description === "" ? null : (
              <span>
                <strong>Description </strong>
                {edu.description}
              </span>
            )}
          </p>
        </li>
      );
    });

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Education </h3>
          {eduitems.length > 0 ? (
            <ul className="list-group">{eduitems} </ul>
          ) : (
            <p className="text-center">
              {" "}
              <em>No education was added</em>{" "}
            </p>
          )}
        </div>

        <div className="col-md-6">
          <h3 className="text-center text-info">Experience </h3>
          {expitems.length > 0 ? (
            <ul className="list-group">{expitems} </ul>
          ) : (
            <p className="text-center">
              <em> No experience was added</em>{" "}
            </p>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
