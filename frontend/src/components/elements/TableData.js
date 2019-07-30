import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

class TableData extends Component {
  componentDidUpdate() {
    this.render();
  }

  renderButton() {
    return <Button button={{ type: "secondary", text: 'More' }} />
  }

  // RENDERING ORDERS

  renderOrder() {
    const order = this.props.order;
    const firstColumn = ['ID', 'date', 'Sender', 'Receiver', 'Truck', 'Trailer', 'CLL', 'Bruto', ' Description', 'Declarations'];
    const secondColumn = [order.orderID, order.date, order.sender, order.receiver, order.truck, order.trailer, order.qnt, order.bruto, order.description, order.declarations];
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
    const { orders } = this.props.orders;
    const dataOnPage = this.showDataByPageNumber(orders, this.props.page);
    return dataOnPage.map(order => {
      return (
        <tr key={order._id}>
          <td className="center aligned">
            <Link to={
              {
                pathname: `/orders/${order._id}`,
                state: {
                  data: { order }
                }
              }} >
              {this.renderButton()}
            </Link>
          </td>
          <td className="center aligned">{order.orderID}</td>
          <td className="center aligned">{order.date}</td>
          <td>{order.sender}</td>
          <td>{order.receiver}</td>
          <td className="center aligned">{order.truck}</td>
          <td className="center aligned">{order.trailer}</td>
          <td className="center aligned">{order.qnt}</td>
          <td className="center aligned">{order.bruto}</td>
          <td>{order.description}</td>
          <td className="center aligned">{order.declarations}</td>
        </tr >
      );
    });
  }

  // RENDERING CLIENTS

  renderClient() {
    if (this.props.clients.client === 'undefined') {
      return (<tr rowSpan="5">
        <td colSpan="10">
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        </td>
      </tr>);
    }
    const { data } = this.props.client;
    const firstColumn = ['First Name', 'Last Name', 'Phone', 'E-mail'];
    const secondColumn = [data.firstName, data.lastName, data.phone, data.email];
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
    if (this.props.clients.clients.length === 0) {
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
            <Link to={`/clients/${client._id}`}>
              {this.renderButton()}
            </Link>
          </td>
          <td className="center aligned">{client.firstName}</td>
          <td className="center aligned">{client.lastName}</td>
          <td>{client.phone}</td>
          <td>{client.email}</td>
        </tr>
      );
    });
  }

  // RENDERING LOADINGS

  renderLoadings() {
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
          <td className="center aligned">{loading._id}</td>
          <td className="center aligned">{loading.date}</td>
          <td className="center aligned">{loading.truck}</td>
          <td className="center aligned">{loading.trailer}</td>
          <td className="center aligned">{loading.totalQnt}</td>
          <td className="center aligned">{loading.totalBruto}</td>
          <td className="center aligned">{loading.client}</td>
        </tr>
      );
    });
  }

  // DISPLAY DATA BY PAGE NUMBER AND PAGINATION

  showDataByPageNumber(data, page) {
    if (data === 'undefined') return null;
    if (data.length <= 10) {
      return data;
    } else {
      if (page) {
        return data.slice((page - 1) * 10, page * 10);
      } else {
        return data.slice(0, 10);
      }
    }
  }

  renderPagination(type) {
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
    if (totalData.length <= 10) {
      return null;
    } else if (page && page <= totalData.length / 10) {
      return (
        <tr>
          <td colSpan="3">
            {this.renderPageButtons(type, totalData, page)}
          </td>
        </tr>
      )
    }
  }

  renderPageButtons(type, data, page) {
    const p = parseInt(page)
    if (data.length / 10 > 1) {
      if (p > 1 && p < data.length / 10) {
        return (
          <Fragment>
            <Link className="ui secondary button" to={`/${type}/page/${p - 1}`}> Prev </Link>
            <Link className="ui secondary button" to={`/${type}/page/${p + 1}`}> Next </Link>
          </Fragment>
        )
      } else if (p === 1) {
        return <Link className="ui secondary button" to={`/${type}/page/${p + 1}`}> Next </Link>;
      } else {
        return <Link className="ui secondary button" to={`/${type}/page/${p - 1}`}> Prev </Link>;
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
    } else if (this.props.client) {
      return this.renderClient();
    } else if (this.props.clients) {
      return (
        <Fragment>
          {this.renderClients()}
          {this.renderPagination('clients')}
        </Fragment>
      )
    } else if (this.props.order) {
      return this.renderOrder();
    } else if (this.props.orders) {
      return (
        <Fragment>
          {this.renderOrders()}
          {this.renderPagination('orders')}
        </Fragment>
      )
    } else if (this.props.loadings) {
      return (
        <Fragment>
          {this.renderLoadings()}
          {this.renderPagination('loadings')}
        </Fragment>
      )
    }
  }

  render() {
    return (
      <tbody>
        {this.renderTableData()}
      </tbody>
    );
  };
}

export default TableData;
