import React, { Component } from "react";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PropTypes from "prop-types";
import { getPosts } from "../../actions/postAction";
import PostFeed from "./PostFeed";

class Posts extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    this.props.getPosts();
  }

  render() {
    const { posts, loading } = this.props.post;
    let postitems;
    if (posts === null || loading) {
      postitems = <h1>Loading..</h1>;
    } else {
      console.log(posts);
      postitems = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postitems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  post: PropTypes.object.isRequired,
  err: PropTypes.any,
  getPosts: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  err: state.err,
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
