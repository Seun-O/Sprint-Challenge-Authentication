import React, { Component } from "react";
import { connect } from "react-redux";

import { getJokes } from "../actions";
import "./jokes.css";

class jokeList extends Component {
  componentDidMount() {
    this.props.getJokes();
  }
  render() {
    return (
      <div className="joke-container">
        {this.props.jokes.map(joke => (
          <p key={joke.id}>{joke.joke}</p>
        ))}
      </div>
    );
  }
}

const mapState = state => {
  return {
    jokes: state.jokes
  };
};

export default connect(
  mapState,
  { getJokes }
)(jokeList);
