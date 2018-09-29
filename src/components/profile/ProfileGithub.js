import React, { Component } from "react";
import PropTypes from "prop-types";

class ProfileGithub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: "ae27c89b2bf76cf27478",
      clientSecret: "cc4efbb4e214656d6eb8fde9430e18b24eaee590",
      count: 5,
      sort: "created: asc",
      repos: [],
      error: ""
    };
  }

  fetchGithubRepo = githubusername => {
    const { clientId, clientSecret, count, sort } = this.state;
    fetch(
      `https://api.github.com/users/${githubusername}/repos?per_page=${count}&sort=${sort}
    &client_id=${clientId}&client_secret=${clientSecret}`
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.constructor === Array) this.setState({ repos: data });
        else this.setState({ repos: [] });
      })
      .catch(err => console.log(err));
  };

  componentWillReceiveProps = nextProps => {
    console.log("NEXT PROPS", nextProps.githubusername);
    this.fetchGithubRepo(nextProps.githubusername);
  };

  componentDidMount() {
    console.log("DID MOUNT", this.props.githubusername);

    this.fetchGithubRepo(this.props.githubusername);
  }

  render() {
    const { repos } = this.state;
    let repoitems;
    if (repos.constructor === Array) {
      repoitems = repos.map(repo => {
        return (
          <div key={repo.id} className="card card-body mb-2">
            <div className="row">
              <div className="col-md-6">
                <h4>
                  <a href={repo.html_url} className="text-info" target="_blank">
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div className="col-md-6">
                <span className="badge badge-info mr-1">
                  Stars: {repo.stargazers_count}
                </span>
                <span className="badge badge-secondary mr-1">
                  Watchers: {repo.watchers_count}
                </span>
                <span className="badge badge-success">
                  Forks:{repo.forks_count}
                </span>
              </div>
            </div>
          </div>
        );
      });
    } else {
      repoitems = (
        <span className="text-center">
          {" "}
          <em>No Repository Found</em>{" "}
        </span>
      );
    }
    return (
      <div ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {repoitems}
      </div>
    );
  }
}

ProfileGithub.propTypes = {
  githubusername: PropTypes.string.isRequired
};
export default ProfileGithub;
