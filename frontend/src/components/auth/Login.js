import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, setError } from '../../action/index';
import { history } from '../history';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: ''
      }
    }
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      history.push('/');
    }
  }

  componentDidUpdate() {
    if (this.props.auth.loading) {
      return <h1>LOADING</h1>
    }
    if (this.props.auth.isAuthenticated) {
      history.push('/');
    }
  }

  onChange = e => {
    this.setState({
      ...this.state,
      user: { ...this.state.user, [e.target.name]: e.target.value }
    })
  }

  onSubmit = e => {
    e.preventDefault();
    // if (this.state.user.email === '' || this.state.user.password === '') {
    //   this.props.setError('Please fill in all fields', 'AUTH')
    // } else {
    //   const { email, password } = this.state.user;
    //   this.props.login({ email, password });
    // }
    this.props.login({ email: 'demo@demo.lt', password: "12345678" });
  }

  render() {
    return (
      <div className="ui raised very padded container segment">
        <form className="ui form" onSubmit={this.onSubmit}>
          <h4 className="ui dividing header">Please Login to continue</h4>
          <p>demo@demo.lt 12345678</p>
          <div className="six wide field">
            <input
              type="text"
              name="email"
              placeholder="email"

              value={this.state.email}
              onChange={this.onChange}
            />
          </div>
          <div className="six wide field">
            <input
              type="password"
              name="password"
              placeholder="password"

              value={this.state.password}
              onChange={this.onChange}
            />
          </div>
          <button className="ui button" type="submit">Submit</button>
        </form>
        {this.props.auth.error &&
          <div className="ui red segment" style={{ color: "#e25353" }}>
            <i className="times icon"></i>{this.props.auth.error}
          </div>
        }
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { login, setError })(Login);
