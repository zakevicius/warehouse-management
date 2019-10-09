import React, { Component, Fragment } from 'react';
import TableHeader from './TableHeader';
import TableData from './TableData';

class Table extends Component {
  state = {
    type: this.props.type,
    client: this.props.client,
    clients: this.props.clients,
    order: this.props.order,
    orders: this.props.orders,
    loading: this.props.loading,
    loadings: this.props.loadings,
    loadingOrderList: this.props.loadingOrderList,
    page: this.props.page,
    url: this.props.url,
    additional: this.props.additional
  }

  sortTable = (type, sortType, data) => {
    console.log(type, sortType, data);
    console.log(this.state);
    let sortedOrders;

    const sortData = (data, column, sortType) => {
      const sortedData = data.sort((a, b) => {
        let numA = parseInt(a[column].replace(/\D/g, ""));
        let numB = parseInt(b[column].replace(/\D/g, ""));
        let letA = a[column].replace(/[0-9]/g, "");
        let letB = b[column].replace(/[0-9]/g, "");

        switch (sortType) {
          case 'ASC':
            if (letA > letB) { return 1 }
            else if (letA === letB) {
              if (numA > numB) { return 1 }
              else { return -1 }
            }
            else { return -1 };
          default:
            if (letA < letB) { return 1 }
            else if (letA === letB) {
              if (numA < numB) { return 1 }
              else { return -1 }
            }
            else { return -1 }
        }
      });
      return sortedData;
    }

    switch (type) {
      case 'orders':
        if (!this.state.orders) break;
        switch (data) {
          case 'Order':
            sortedOrders = sortData(this.state.orders.orders, 'orderID', sortType);
            this.setState({ orders: { orders: sortedOrders } });
            break;
          case 'Additional ID':
            sortedOrders = sortData(this.state.orders.orders, 'additionalID', sortType);
            this.setState({ orders: { orders: sortedOrders } });
            break;
          default:
            break;
        };
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <Fragment>
        <table className="ui celled striped table segment">
          <TableHeader
            type={this.props.type}
            sortTable={this.sortTable}
          />
          <TableData
            type={this.props.type}
            client={this.props.client}
            clients={this.props.clients}
            order={this.props.order}
            orders={this.props.orders}
            loading={this.props.loading}
            loadings={this.props.loadings}
            loadingOrderList={this.props.loadingOrderList}
            page={this.props.page}
            url={this.props.url}
            additional={this.props.additional}
          />
        </table>
      </Fragment>
    );
  };
};


export default Table;
