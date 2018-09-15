import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteEducation } from "../../actions/profileActions";

class Education extends Component {
  onDeleteEdu = id => {
    this.props.deleteEducation(id);
  };
  render() {
    const education = this.props.education.map(edu => {
      return (
        <tr key={edu._id}>
          <td>{edu.school}</td>
          <td>{edu.fieldOfStudy}</td>
          <td>
            <Moment format="MMM YYYY">{edu.from}</Moment> -{" "}
            {edu.to === null ? (
              " Now"
            ) : (
              <Moment format="MMM YYYY">{edu.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={this.onDeleteEdu.bind(this, edu._id)}
              className="btn btn-danger"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div>
        <h4 className="mb-4">Education</h4>
        <table className="table">
          <thead>
            <tr>
              <th>School</th>
              <th>Field Of Study</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{education}</tbody>
        </table>
      </div>
    );
  }
}

Education.propTypes = {
  deleteEducation: PropTypes.func.isRequired
};
export default connect(null, { deleteEducation })(Education);
