import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../../action/index';

class Register extends Component {
  render() {
    return (
      <form className="ui form" onSubmit={this.onSubmit}>
        <h4 className="ui dividing header">Please Login to continue</h4>
        <div className="six wide field">
          <input
            type="text"
            name="email"
            placeholder="email"
            required
            value={this.state.email}
            onChange={this.onChange}
          />
        </div>
        <div className="six wide field">
          <input
            type="password"
            name="password"
            placeholder="password"
            required
            value={this.state.password}
            onChange={this.onChange}
          />
        </div>
        <button className="ui button" type="submit">Submit</button>
      </form>
    )
  };
};

export default Register;
