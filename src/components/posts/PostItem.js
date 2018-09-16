import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, likeDislike } from "../../actions/postAction";

class PostItem extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  likeUnlike = postid => {
    this.props.likeDislike(postid);
  };
  onDeletePost = postid => {
    this.props.deletePost(postid);
  };
  render() {
    const { post, auth } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {post.likes.length > 0 ? (
              <button
                onClick={this.likeUnlike.bind(this, post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-info fas fa-thumbs-up" />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
            ) : (
              <button
                onClick={this.likeUnlike.bind(this, post._id)}
                type="button"
                className="btn btn-light mr-1"
              >
                <i className="text-secondary fas fa-thumbs-up" />
              </button>
            )}

            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === auth.user.id ? (
              <button
                type="button"
                onClick={this.onDeletePost.bind(this, post._id)}
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  likeDislike: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deletePost, likeDislike }
)(PostItem);
