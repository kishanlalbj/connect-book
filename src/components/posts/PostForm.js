import React, { Component } from "react";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../Input/TextAreaFieldGroup";
import { addPost } from "../../actions/postAction";
import PropTypes from "prop-types";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      error: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.err) {
      console.log(nextProps.err);
    }
  }
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const { user } = this.props.auth;
    const postData = {
      text: this.state.text,
      name: user.name,
      avatar: user.avatar
    };
    this.props.addPost(postData);
    this.setState({ text: "" });
  };
  render() {
    return (
      <div className="col-md-12">
        <div className="post-form mb-3">
          <div className="card card-info">
            <div className="card-header bg-info text-white">
              Say Somthing...
            </div>
            <div className="card-body">
              <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                  <TextAreaFieldGroup
                    className="form-control form-control-lg"
                    placeholder="Say how you feel"
                    name="text"
                    value={this.state.text}
                    onChange={this.handleChange.bind(this)}
                  />
                </div>
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
PostForm.propTypes = {
  err: PropTypes.string,
  addPost: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
