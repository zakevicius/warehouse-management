import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register, fetchData } from '../../action/index';
import Error from '../elements/Error';
import Success from '../elements/Success';

class Register extends Component {

  componentDidMount() {
    this.props.fetchData("/clients");
  }

  state = {
    name: "",
    email: "",
    password: "",
    type: "client",
    selectedClient: "",
    clients: [],
  };

  renderSelect = (type) => {

    const renderClientList = (clients) => {
      if (clients.length === 0) return null;

      return clients.map(client => (
        <option key={client._id} value={client.name}>
          {client.name}
        </option>));
    }

    if (type === 'client') {
      return (
        <div className="six wide field">
          <div className="field">
            <label htmlFor="selectedClient">Client</label>
            <select
              className="ui fluid dropdown"
              name="selectedClient"
              value={this.state.selectedClient}
              onChange={this.onChange}
              required
            >
              <option value=''>Select a client...</option>
              {renderClientList(this.props.clients)}
            </select>
          </div>
        </div>
      );
    }
  };

  renderMessage = () => {
    const { newUserCreated, registerMsg } = this.props.auth;
    if (newUserCreated === 'success') {
      return <Success msg={registerMsg} />
    } else if (newUserCreated === 'fail') {
      return <Error error={registerMsg} />
    }
  }

  onChange = e => {
    if (e.target.name === 'selectedClient') {
      let id = this.props.clients.filter(client => client.name === e.target.value)[0]._id;
      this.setState({
        selectedClient: e.target.value,
        clients: [id]
      });
    } else {
      this.setState({
        ...this.state,
        [e.target.name]: e.target.value
      });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.register(this.state);
  }

  render() {
    return (
      <div className="ui raised very padded container segment">
        <form className="ui form" onSubmit={this.onSubmit}>
          <div className="six wide field">
            <input
              type="text"
              name="name"
              placeholder="name"
              required
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>
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
          <div className="inline fields">
            <label htmlFor="type">Select type:</label>
            <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="type" value="client" defaultChecked onChange={this.onChange} />
                <label>Client</label>
              </div>
            </div>
            {/* <div className="field">
              <div className="ui radio checkbox">
                <input type="radio" name="type" value="user" onChange={this.onChange} />
                <label>User</label>
              </div>
            </div> */}
          </div>
          {this.renderSelect(this.state.type)}
          <button className="ui button" type="submit">Submit</button>
        </form>
        {this.renderMessage()}
      </div>
    )
  };
};

const mapStateToProps = state => {
  return {
    clients: state.clientsData.clients,
    auth: state.auth
  }
};

export default connect(mapStateToProps, { register, fetchData })(Register);
