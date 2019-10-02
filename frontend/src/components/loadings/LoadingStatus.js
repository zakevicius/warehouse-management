import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '../elements/Button';
import { updateData, setError } from '../../action';

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
    let confirmLoaded = true;
    if (this.state.newStatus === "loaded") {
      for (let i = 0; i < this.props.loading.orders.length; i++) {
        if (this.props.loading.orders[i].status === 'waiting') {
          this.props.setError('Not all orders have arrived.', '/loadings');
          this.setState({
            button: 'Update',
            editStatus: false,
          });
          confirmLoaded = false;
          break;
        }
      };
    }
    if (!confirmLoaded) return;
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
          <form onSubmit={this.onSubmit} style={{ 'display': 'flex', 'align-items': 'center' }}>
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
          <span style={{ 'margin': '5px' }}>{this.state.status.charAt(0).toUpperCase() + this.state.status.slice(1)}</span>
          {this.renderStatusButton()}
        </Fragment>
      )
    }
  }

  render() {
    return (
      <div className="ui segment" style={{ 'display': 'flex', 'align-items': 'center' }}>
        Status: {this.renderStatusList()}
      </div>
    )
  }
};

const mapStateToProps = state => {
  return {
    loading: state.loadingsData.loading
  }
}

export default connect(mapStateToProps, { updateData, setError })(LoadingStatus);
