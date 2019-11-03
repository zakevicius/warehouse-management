import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { history } from '../history';
import { fetchSingleData, updateData, clearError, setActiveTab } from '../../action';
import Button from '../elements/Button';
import Error from '../elements/Error';
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
    ordersToLoad: [],
    driverPhone: '',
    commentsOnLoading: ''
  }

  async componentWillMount() {
    this.props.clearError('/loadings');
    this.props.setActiveTab('primary', 'loadings');

    if (!this.props.loading) { return history.push('/') };

    await this.props.fetchSingleData('/clients', this.props.loading.data.clientID);

    const { loadingID, truck, trailer, date, status, driverPhone, commentsOnLoading } = this.props.loading.data;
    const client = this.props.loading.client.name;
    const ordersToLoad = this.props.loading.orders;
    const ordersList = this.props.client.orders.filter(order => (order.status === 'in' || order.status === 'waiting') & !order.loadingID);

    this.setState({
      loadingID,
      truck,
      client,
      date,
      trailer,
      ordersToLoad,
      ordersList,
      status,
      driverPhone,
      commentsOnLoading
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
      driverPhone: this.state.driverPhone,
      commentsOnLoading: this.state.commentsOnLoading,
      orders: this.state.ordersToLoad.map(order => order._id),
      status: this.state.status,
      totalQnt: totalQnt.toFixed(3),
      totalBruto: totalBruto.toFixed(3)
    }, this.props.loading.data._id);
  }

  render() {
    return (
      <Fragment>
        <div className="ui container">
          <div className="ui very padded segment">
            <form onSubmit={this.onSubmit} className="ui form">
              <div className="three fields">
                <div className="field">
                  <label htmlFor="client">Client</label>
                  <input type="text" name="client" value={this.state.client} disabled />
                  {/* {this.renderClientList()} */}
                </div>
                <div className="field">
                  <label htmlFor="loadingID">ID</label>
                  <input type="text" name="loadingID" value={this.state.loadingID} disabled />
                </div>
                <div className="field">
                  <label htmlFor="date">Date</label>
                  <input type="date" name="date" value={this.state.date.split('T')[0]} onChange={this.onChange} />
                </div>
              </div>
              <div className="three fields">
                <div className="field">
                  <label htmlFor="truck">Truck</label>
                  <input type="text" name="truck" value={this.state.truck} onChange={this.onChange} />
                </div>
                <div className="field">
                  <label htmlFor="trailer">Trailer</label>
                  <input type="text" name="trailer" value={this.state.trailer} onChange={this.onChange} />
                </div>
                <div className="field">
                  <label htmlFor="driverPhone">Driver's phone number</label>
                  <input type="text" name="driverPhone" value={this.state.driverPhone} onChange={this.onChange} />
                </div>
              </div>
              <div className="field">
                <label htmlFor="commentsOnLoading">Comments on loading</label>
                <input type="text" name="commentsOnLoading" value={this.state.commentsOnLoading} onChange={this.onChange} />
              </div>
              {this.props.error ? <Error error={this.props.error} /> : null}
              <Button button={{ type: 'primary ', text: 'Submit' }} />
            </form>
          </div>
        </div>

        <div className="ui segment">
          <div style={{ 'display': 'flex' }}>
            <div style={{ 'margin': '5px', 'flex': '1' }}>
              <h4>In truck</h4>
              <LoadingOrderListCreate
                orders={this.state.ordersToLoad}
                removeOrderFromLoading={this.removeOrderFromLoading}
                action='remove'
              />
            </div>
            <div style={{ 'margin': '5px', 'flex': '1' }}>
              <h4>In warehouse</h4>
              <LoadingOrderListCreate
                orders={this.state.ordersList}
                addOrderToLoading={this.addOrderToLoading}
                action='add'
              />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

const mapStateToProps = state => {
  return {
    loading: state.loadingsData.loading,
    client: state.clientsData.client,
    error: state.loadingsData.error
  }
}

export default connect(mapStateToProps, { fetchSingleData, updateData, clearError, setActiveTab })(LoadingEdit);
