import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { updateData, clearError } from '../../action';
import NewOrderInfoItem from './NewOrderInfoItem';

class NewOrderInfo extends Component {
  state = {
    finalQnt: (this.props.order.finalQnt === '' || !this.props.order.finalQnt) ? this.props.order.qnt : this.props.order.finalQnt,
    finalBruto: (this.props.order.finalBruto === '' || !this.props.order.finalBruto) ? this.props.order.bruto : this.props.order.finalBruto,
    edit: false,
  };

  onClick = (e) => {
    this.setState({ edit: true });
  }

  renderStatusIcon = () => {
    if (!this.state.edit) {
      return (
        <i style={{ 'float': 'right' }} className='edit icon' onClick={this.onClick}></i>
      );
    } else {
      return;
    }
  }

  renderForm = () => {
    if (!this.state.edit) return null;
    return (
      <NewOrderInfoItem type={this.props.type} order={this.props.order} onSubmit={this.onSubmit} />
    )
  }

  onSubmit = (e, { finalQnt, finalBruto }) => {
    this.setState({
      finalQnt,
      finalBruto,
      edit: false,
      action: 'Update'
    });

    this.props.clearError('/orders');

    e.preventDefault();

    let finalTotalQnt = 0;
    let finalTotalBruto = 0;
    this.props.loading.orders.forEach(order => {
      if (order._id !== this.props.order._id) {
        if (!order.finalQnt) {
          finalTotalQnt += parseFloat(parseFloat(order.qnt).toFixed(3));
        } else {
          finalTotalQnt += parseFloat(parseFloat(order.finalQnt).toFixed(3));
        }
        if (!order.finalBruto) {
          finalTotalBruto += parseFloat(parseFloat(order.bruto).toFixed(3));
        } else {
          finalTotalBruto += parseFloat(parseFloat(order.finalBruto).toFixed(3));
        }
      } else {
        finalTotalQnt += parseFloat(parseFloat(finalQnt).toFixed(3));
        finalTotalBruto += parseFloat(parseFloat(finalBruto).toFixed(3));
      }
    });

    const newOrderData = {
      finalQnt,
      finalBruto
    };

    const newLoadingData = {
      finalTotalQnt,
      finalTotalBruto
    }
    this.props.updateData('/orders', newOrderData, this.props.order._id, true);
    this.props.updateData('/loadings', newLoadingData, this.props.loading.data._id);
  }

  render() {
    let { type } = this.props;
    return (
      <Fragment>
        <span>{type === 'cll' ? this.state.finalQnt : this.state.finalBruto}</span>
        {this.renderStatusIcon()}
        {this.renderForm()}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { updateData, clearError })(NewOrderInfo);