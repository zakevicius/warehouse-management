import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '../elements/Button';
import { updateData } from '../../action';

class LoadingStatus extends Component {

  state = {
    status: this.props.loading.data.status,
    newStatus: this.props.loading.data.status,
    button: 'Update',
    editStatus: false
  };

  onChange = e => {
    this.setState({ newStatus: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    this.setState({
      button: 'Update',
      editStatus: false,
      status: this.state.newStatus
    });
    this.props.updateData('/loadings', {
      status: this.state.newStatus,
      orders: this.props.loading.data.orders
    }, this.props.loading.data._id);
  }

  onClick = (e) => {
    switch (e.target.textContent) {
      case "Update":
        this.setState({ button: 'Confirm', editStatus: true });
        break;
      case "Cancel":
        this.setState({ button: 'Update', editStatus: false, newStatus: this.state.status });
        break;
      default:
        break;
    }
  }

  renderStatusButton = () => {
    return (
      <Button
        button={{ type: 'positive basic left floated', text: this.state.button }}
        onClick={this.onClick}
      />
    )
  }

  renderStatusList = () => {
    if (this.state.editStatus) {
      return (
        <Fragment>
          <form onSubmit={this.onSubmit}>
            <select
              className="ui fluid dropdown one wide"
              name='status'
              value={this.state.newStatus}
              onChange={this.onChange}
              required>
              <option value="waiting to load">Waiting to load</option>
              <option value="loading">Loading</option>
              <option value="loaded">Loaded</option>
            </select>
            {this.renderStatusButton()}
          </form>
          {
            this.state.editStatus && <Button
              button={{ type: 'negative basic left floated', text: "Cancel" }}
              onClick={this.onClick}
            />
          }
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <span>{this.state.status.charAt(0).toUpperCase() + this.state.status.slice(1)}</span>
          {this.renderStatusButton()}
        </Fragment>
      )
    }
  }

  render() {
    return (
      <div className="ui segment">
        Status: {this.renderStatusList()}
      </div>
    )
  }
};


export default connect(null, { updateData })(LoadingStatus);
