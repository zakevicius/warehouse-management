import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

class TableData extends Component {
  constructor(props) {
    super(props);
    this.itemsPerPage = 10
  }


  renderButton() {
    return <Button button={{ type: "secondary", text: 'More' }} />
  }

  // RENDERING ORDERS

  renderOrder() {
    if (!this.props.order) {
      return (<tr rowSpan="5">
        <td colSpan="10">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </td>
      </tr>);
    }
    const order = this.props.order;
    const firstColumn = ['ID', 'Status', 'Date', 'Sender', 'Receiver', 'Truck', 'Trailer', 'CLL', 'Bruto', ' Description', 'Declarations'];
    const secondColumn = [order.orderID, order.status, order.date.split('T')[0], order.sender, order.receiver, order.truck, order.trailer, order.qnt, order.bruto, order.description, order.declarations.join(', ')];
    let i = 0;
    return (
      firstColumn.map(text => {
        i++;
        return (
          <tr key={i}>
            <td className="right aligned" style={{ fontWeight: "bold" }}>{text}</td>
            <td>{secondColumn[i - 1]}</td>
            {i === 1 && <td rowSpan={secondColumn.length}></td>}
          </tr >
        );
      })
    );
  }

  renderOrders() {
    if (!this.props.orders) {
      return (<tr rowSpan="5">
        <td colSpan="10">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </td>
      </tr>);
    }
    const { orders } = this.props.orders;
    const dataOnPage = this.showDataByPageNumber(orders, this.props.page);
    return dataOnPage.map(order => {
      return (
        <tr key={order._id}>
          <td className="center aligned">
            <Link to={`/orders/${order._id}`} >
              {this.renderButton()}
            </Link>
          </td>
          <td className="center aligned">{order.status}</td>
          <td className="center aligned">{order.orderID}</td>
          <td className="center aligned">{order.date.split('T')[0]}</td>
          <td>{order.sender}</td>
          <td>{order.receiver}</td>
          <td className="center aligned">{order.truck}</td>
          <td className="center aligned">{order.trailer}</td>
          <td className="center aligned">{order.qnt}</td>
          <td className="center aligned">{order.bruto}</td>
          <td>{order.description}</td>
          <td className="center aligned">{order.declarations.join(', ')}</td>
        </tr >
      );
    });
  }

  // RENDERING CLIENTS

  renderClient() {
    if (!this.props.client) {
      return (<tr rowSpan="5">
        <td colSpan="10">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </td>
      </tr>);
    }
    const { data } = this.props.client;
    const firstColumn = ['Name', 'Phone', 'E-mail'];
    const secondColumn = [data.name, data.phone, data.email];
    let i = 0;
    return (
      firstColumn.map(text => {
        i++;
        return (
          <tr key={i}>
            <td>{text}</td>
            <td className="left aligned">{secondColumn[i - 1]}</td>
          </tr>
        );
      })
    );
  }

  renderClients() {
    if (!this.props.clients) {
      return (<tr rowSpan="5">
        <td colSpan="10">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </td>
      </tr>);
    }
    const { clients } = this.props.clients;
    const dataOnPage = this.showDataByPageNumber(clients, this.props.page);
    return dataOnPage.map(client => {
      return (
        <tr key={client._id}>
          <td className="center aligned">
            <Link to={`/clients/${client._id}/page/1`}>
              {this.renderButton()}
            </Link>
          </td>
          <td className="center aligned">{client.name}</td>
          <td>{client.phone}</td>
          <td>{client.email}</td>
        </tr>
      );
    });
  }

  // RENDERING LOADINGS

  renderLoadings() {
    if (!this.props.loadings) {
      return (<tr rowSpan="5">
        <td colSpan="10">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </td>
      </tr>);
    }
    const { loadings } = this.props.loadings;
    const dataOnPage = this.showDataByPageNumber(loadings, this.props.page);
    return dataOnPage.map(loading => {
      return (
        <tr key={loading._id}>
          <td className="center aligned">
            <Link to={`/loadings/${loading._id}`}>
              {this.renderButton()}
            </Link>
          </td>
          <td className="center aligned">{loading.status}</td>
          <td className="center aligned">{loading.loadingID}</td>
          <td className="center aligned">{loading.date.split('T')[0]}</td>
          <td className="center aligned">{loading.truck}</td>
          <td className="center aligned">{loading.trailer}</td>
          <td className="center aligned">{loading.totalQnt}</td>
          <td className="center aligned">{loading.totalBruto}</td>
        </tr>
      );
    });
  }

  renderLoading() {
    if (!this.props.loading) {
      return this.renderSpinner();
    }
    const { data, client } = this.props.loading;
    const firstColumn = ['ID', 'Truck', 'Trailer', 'Client'];
    const secondColumn = [data.loadingID, data.truck, data.trailer, client.name];
    let i = 0;
    return (
      firstColumn.map(text => {
        i++;
        return (
          <tr key={i}>
            <td>{text}</td>
            <td className="left aligned">{secondColumn[i - 1]}</td>
          </tr>
        );
      })
    );
  }

  renderAddRemove(id) {
    const { addOrderToLoading, removeOrderFromLoading, action } = this.props.additional
    if (action === 'add') {
      return (
        <i
          className="plus icon"
          onClick={() => addOrderToLoading(id)}
        />
      );
    } else if (action === 'remove') {
      return (
        <i
          className="minus icon"
          onClick={() => removeOrderFromLoading(id)}
        />
      );
    }
  }

  renderLoadingOrderListCreate() {
    const orders = this.props.orders;
    if (orders) {
      return orders.map(order => {
        return (
          <tr key={order._id}>
            <td className="center aligned">
              {this.renderAddRemove(order._id)}
            </td>
            <td className="center aligned">{order.orderID}</td>
            <td className="center aligned">{order.date.split('T')[0]}</td>
            <td className="center aligned">{order.sender}</td>
            <td className="center aligned">{order.receiver}</td>
            <td className="center aligned">{order.qnt}</td>
            <td className="center aligned">{order.bruto}</td>
          </tr>
        );
      });
    }
  }

  renderLoadingOrderList() {
    if (!this.props.loadingOrderList) {
      return this.renderSpinner();
    }
    const orders = this.props.loadingOrderList;
    const dataOnPage = this.showDataByPageNumber(orders, this.props.page);
    return dataOnPage.map(order => {
      return (
        <tr key={order._id}>
          <td className="center aligned">
            {order.orderID}
          </td>
          <td className="center aligned">{order.date.split('T')[0]}</td>
          <td className="center aligned">{order.sender}</td>
          <td className="center aligned">{order.receiver}</td>
          <td>{order.truck}</td>
          <td>{order.trailer}</td>
          <td className="center aligned">{order.qnt}</td>
          <td className="center aligned">{order.bruto}</td>
          <td className="center aligned">{order.description}</td>
          <td className="center aligned">{order.declarations.join(', ')}</td>
        </tr >
      );
    });
  }

  // SPINNER
  renderSpinner() {
    return (
      <tr rowSpan="5">
        <td colSpan="10">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </td>
      </tr>
    );
  }

  // DISPLAY DATA BY PAGE NUMBER AND PAGINATION

  showDataByPageNumber(data, page) {
    if (data === 'undefined') return null;
    if (data.length <= this.itemsPerPage) {
      return data;
    } else {
      if (page) {
        return data.slice((page - 1) * this.itemsPerPage, page * this.itemsPerPage);
      } else {
        return data.slice(0, this.itemsPerPage);
      }
    }
  }

  renderPagination() {
    let totalData;
    const page = this.props.page || 0;
    if (!this.props) {
      return null;
    } else if (this.props.clients) {
      totalData = this.props.clients.clients;
    } else if (this.props.orders) {
      totalData = this.props.orders.orders;
    } else if (this.props.loadings) {
      totalData = this.props.loadings.loadings;
    }
    if (totalData.length <= this.itemsPerPage || page === 0) {
      return null;
    } else {
      return (
        <tr>
          <td colSpan="3">
            {this.renderPageButtons(totalData, page, this.props.url)}
          </td>
        </tr>
      )
    }
  }

  renderPageButtons(data, page, url) {
    const p = parseInt(page);
    if (data.length / this.itemsPerPage > 1) {
      if (p > 1 && p < data.length / this.itemsPerPage) {
        return (
          <Fragment>
            <Link className="ui secondary button" to={`${url}page/${p - 1}`}> Prev </Link>
            <Link className="ui secondary button" to={`${url}page/${p + 1}`}> Next </Link>
          </Fragment>
        )
      } else if (p === 1) {
        return <Link className="ui secondary button" to={`${url}page/${p + 1}`}> Next </Link>;
      } else {
        return <Link className="ui secondary button" to={`${url}page/${p - 1}`}> Prev </Link>;
      }
    }
  }

  // WHICH DATA TO SHOW IN TABLE (CLIENTS, ORDERS, LOADINGS)

  renderTableData() {
    if (!this.props) {
      return (
        <tr rowSpan="5">
          <td colSpan="10">
            <div className="ui active inverted dimmer">
              <div className="ui text loader">Loading</div>
            </div>
          </td>
        </tr>
      );
    } else {
      switch (this.props.type) {
        case 'orders':
          return (
            <Fragment>
              {this.renderOrders()}
              {this.renderPagination()}
            </Fragment>
          );
        case 'order':
          return this.renderOrder();
        case 'clients':
          return (
            <Fragment>
              {this.renderClients()}
              {this.renderPagination()}
            </Fragment>
          );
        case 'client':
          return this.renderClient();
        case 'loadings':
          return (
            <Fragment>
              {this.renderLoadings()}
              {this.renderPagination()}
            </Fragment>
          );
        case 'loading':
          return this.renderLoading();
        case 'loadingOrderList':
          return this.renderLoadingOrderList();
        case 'loadingOrderListCreate':
          return this.renderLoadingOrderListCreate();
        default:
          return null;
      }
    }
  }
  render() {
    return (
      <tbody>
        {this.renderTableData()}
      </tbody>
    );
  }
}


export default TableData;
