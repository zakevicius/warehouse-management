import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData, updateData } from '../../action';
import Button from '../elements/Button';
import LoadingOrderListCreate from './LoadingOrderListCreate';

class LoadingEdit extends Component {
  state = {
    loadingID: '',
    truck: '',
    trailer: '',
    ordersList: [],
    clientID: '',
    client: '',
    date: '',
    ordersToLoad: []
  }

  async componentWillMount() {
    await this.props.fetchSingleData('/clients', this.props.loading.data.clientID);
    const { loadingID, truck, trailer, date } = this.props.loading.data;
    const client = this.props.loading.client.name;
    const ordersToLoad = this.props.loading.orders;
    const ordersList = this.props.client.orders.filter(order => (order.status === 'in' || order.status === 'waiting') && order.loadingID === null);
    this.setState({
      loadingID,
      truck,
      client,
      date,
      trailer,
      ordersToLoad,
      ordersList
    });
  }

  addOrderToLoading = (order) => {
    this.setState({
      ...this.state,
      ordersToLoad: [
        ...this.state.ordersToLoad,
        ...this.state.ordersList.filter(item => item._id === order)
      ],
      ordersList: this.state.ordersList.filter(item => item._id !== order)
    });
  };

  removeOrderFromLoading = (order) => {
    this.setState({
      ...this.state,
      ordersToLoad: this.state.ordersToLoad.filter(item => item._id !== order),
      ordersList: [
        ...this.state.ordersList,
        ...this.state.ordersToLoad.filter(item => item._id === order)
      ]
    });
  };

  onChange = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault();
    let totalQnt = 0;
    let totalBruto = 0;
    this.state.ordersToLoad.forEach(order => {
      totalQnt += order.qnt;
      totalBruto += order.bruto;
    });
    this.props.updateData('/loadings', {
      loadingID: this.state.loadingID,
      truck: this.state.truck,
      trailer: this.state.trailer,
      orders: this.state.ordersToLoad.map(order => order._id),
      status: 'waiting to load',
      totalQnt: totalQnt.toFixed(3),
      totalBruto: totalBruto.toFixed(3)
    }, this.props.loading.data._id);
  }

  render() {
    return (
      <div className="ui container">
        <form onSubmit={this.onSubmit} className="ui form">
          <div className="field">
            <label htmlFor="loadingID">ID</label>
            <input type="text" name="loadingID" value={this.state.loadingID} disabled />
          </div>
          <div className="field">
            <label htmlFor="client">Client</label>
            <input type="text" name="client" value={this.state.client} disabled />
            {/* {this.renderClientList()} */}
          </div>
          <div className="field">
            <label htmlFor="date">Date</label>
            <input type="date" name="date" value={this.state.date.split('T')[0]} onChange={this.onChange} />
          </div>
          <div className="field">
            <label htmlFor="truck">Truck</label>
            <input type="text" name="truck" value={this.state.truck} onChange={this.onChange} />
          </div>
          <div className="field">
            <label htmlFor="trailer">Trailer</label>
            <input type="text" name="trailer" value={this.state.trailer} onChange={this.onChange} />
          </div>
          <Button button={{ type: 'primary ', text: 'Submit' }} />
        </form>
        <div className="ui container">
          <div className="ui segment">
            <LoadingOrderListCreate
              orders={this.state.ordersToLoad}
              removeOrderFromLoading={this.removeOrderFromLoading}
              action='remove'
            />
          </div>
          <div className="ui segment">
            <LoadingOrderListCreate
              orders={this.state.ordersList}
              addOrderToLoading={this.addOrderToLoading}
              action='add'
            />
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    loading: state.loadingsData.loading,
    client: state.clientsData.client
  }
}

export default connect(mapStateToProps, { fetchSingleData, updateData })(LoadingEdit);
