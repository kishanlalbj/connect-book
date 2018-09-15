import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { deleteExperience } from "../../actions/profileActions";

class Experience extends Component {
  onDeleteExp = id => {
    console.log(id);
    this.props.deleteExperience(id, this.props.history);
  };
  render() {
    const experience = this.props.experience.map(exp => {
      return (
        <tr key={exp._id}>
          <td>{exp.company}</td>
          <td>{exp.title}</td>
          <td>
            <Moment format="MMM YYYY">{exp.from}</Moment> -{" "}
            {exp.to === null ? (
              " Now"
            ) : (
              <Moment format="MMM YYYY">{exp.to}</Moment>
            )}
          </td>
          <td>
            <button
              onClick={this.onDeleteExp.bind(this, exp._id)}
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
        <h4 className="mb-4">Experience</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
            </tr>
          </thead>
          <tbody>{experience}</tbody>
        </table>
      </div>
    );
  }
}

Experience.propTypes = {
  deleteExperience: PropTypes.func.isRequired
};
export default connect(null, { deleteExperience })(Experience);
