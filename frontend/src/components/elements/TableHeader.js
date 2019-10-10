import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { history } from '../history';
import { removeData } from '../../action';
import Button from './Button';

class TableHeader extends Component {
  state = {
    sortType: 'ASC'
  }

  remove = (type) => {
    switch (type) {
      case 'client':
        this.props.removeData('/clients', this.props.client.data._id);
        break;
      case 'order':
        this.props.removeData('/orders', this.props.order._id);
        break;
      case 'loading':
        this.props.removeData('/loadings', this.props.loading.data._id);
        break;
      default:
        return null;
    };
  }

  // renderSort = () => {
  //   return (
  //     <i className="sort icon" onClick={(e) => this.onSortClick(e, this.props.type, this.state.sortType)} />
  //   )
  // }

  // onSortClick = (e, type, sortType) => {
  //   const data = e.target.parentNode.textContent;
  //   sortType === 'DESC' ? this.setState({ sortType: "ASC" }) : this.setState({ sortType: 'DESC' });
  //   console.log(this.state.sortType)
  //   this.props.sortTable(type, sortType, data);
  // }

  render() {
    console.log('render table')
    switch (this.props.type) {
      case 'orders':
        return (
          <thead>
            <tr>
              <th className="one wide center aligned">
                {
                  this.props.user.type === 'admin' || this.props.user.type === 'super' ?
                    <Link to='/orders/new'>
                      <Button button={{ type: 'primary basic', text: 'New order' }} />
                    </Link>
                    : ""
                }
              </th>
              <th className="one wide center aligned">Status</th>
              <th className="one wide center aligned">
                Order
                {/* {this.renderSort()} */}
              </th>
              <th className="one wide center aligned">
                Additional ID
                {/* {this.renderSort()} */}
              </th>
              <th className="one wide center aligned">
                Date
                {/* {this.renderSort()} */}
              </th>
              <th className="two wide center aligned">
                Sender
                {/* {this.renderSort()} */}
              </th>
              <th className="two wide center aligned">
                Receiver
                {/* {this.renderSort()} */}
              </th>
              <th className="one wide center aligned">
                Truck
                {/* {this.renderSort()} */}
              </th>
              <th className="one wide center aligned">
                Trailer
                {/* {this.renderSort()} */}
              </th>
              <th className="one wide center aligned">CLL</th>
              <th className="one wide center aligned">Bruto</th>
              <th className="three wide center aligned">Description</th>
              <th className="two wide center aligned">Declarations</th>
            </tr>
          </thead>
        );
      case 'order':
      case 'client':
      case 'loading':
        let id, link, page;
        switch (this.props.type) {
          case 'order':
            id = this.props.order && this.props.order._id;
            link = 'orders';
            page = 'page/1';
            break;
          case 'client':
            id = this.props.client && this.props.client.data._id;
            link = 'clients';
            page = 'page/1';
            break;
          case 'loading':
            id = this.props.loading && this.props.loading.data._id;
            link = 'loadings';
            page = 'page/1';
            break;
          default:
            return null;
        }
        return (
          <thead>
            <tr>
              <th className="one wide center aligned">
                {/* <Link to={`/${link}/page/1`}> */}
                <Button
                  button={{ type: 'secondary left floated', text: 'Back' }}
                  onClick={() => history.goBack()}
                />
                {/* </Link> */}
              </th>
              <th className="four wide">
                {
                  this.props.type !== 'clientEdit' &&
                    this.props.type !== 'orderEdit' &&
                    this.props.type !== 'loadingEdit' &&
                    (this.props.user.type === 'admin' || this.props.user.type === 'super') ?
                    (
                      <Link to={`/${link}/edit/${id}`}>
                        <Button
                          button={{ type: 'primary left floated', text: 'Edit' }}
                        />
                      </Link>
                    ) : null
                }
                {
                  this.props.user.type === 'admin' || this.props.user.type === 'super' ?
                    <Button
                      button={{ type: 'negative right floated', text: 'Delete' }}
                      onClick={() => this.remove(this.props.type)}
                    /> : ""
                }
              </th>
              {this.props.type === "order" && <th className="six wide">Files</th>}
            </tr>
          </thead>
        );
      case 'clients':
        return (
          <thead>
            <tr>
              <th className="one wide center aligned">
                {
                  this.props.user.type === 'admin' || this.props.user.type === 'super' ?
                    <Link to='/clients/new'>
                      <Button button={{ type: 'primary basic', text: 'New client' }} />
                    </Link>
                    : ""
                }
              </th>
              <th className="two wide center aligned">Name</th>
              <th className="two wide center aligned">Phone</th>
              <th className="two wide center aligned">E-mail</th>
            </tr>
          </thead>
        );
      case 'loadings':
        return (
          <thead>
            <tr>
              <th className="one wide center aligned">
                {
                  this.props.user.type === 'admin' || this.props.user.type === 'super' ?
                    <Link to='/loadings/new'>
                      <Button button={{ type: 'primary basic', text: 'New loading' }} />
                    </Link>
                    : ""
                }
              </th>
              <th className="two wide center aligned">Status</th>
              <th className="two wide center aligned">ID</th>
              <th className="two wide center aligned">Date</th>
              <th className="two wide center aligned">Truck</th>
              <th className="two wide center aligned">Trailer</th>
              <th className="two wide center aligned">Total CLL</th>
              <th className="two wide center aligned">Total Bruto</th>
            </tr>
          </thead>
        );
      case 'loadingOrderListCreate':
        return (
          <thead>
            <tr>
              <th className="two wide center aligned"></th>
              <th className="two wide center aligned">Cargo ID</th>
              <th className="two wide center aligned">Additional ID</th>
              <th className="two wide center aligned">Date</th>
              <th className="two wide center aligned">Sender</th>
              <th className="two wide center aligned">Receiver</th>
              <th className="two wide center aligned">CLL</th>
              <th className="two wide center aligned">Bruto</th>
            </tr>
          </thead>
        );
      case 'loadingOrderList':
        return (
          <thead>
            <tr>
              <th className="one wide center aligned"></th>
              <th className="two wide center aligned">Cargo ID</th>
              <th className="two wide center aligned">Date</th>
              <th className="two wide center aligned">Sender</th>
              <th className="two wide center aligned">Receiver</th>
              <th className="two wide center aligned">CLL</th>
              <th className="two wide center aligned">Bruto</th>
              <th className="three wide center aligned">Comments</th>
            </tr>
          </thead>
        );
      default:
        return (
          <thead>
            <tr>
              <th>Welcome</th>
            </tr>
          </thead>
        )
    }
  }
};

const mapStateToProps = state => {
  return {
    order: state.ordersData.order,
    client: state.clientsData.client,
    loading: state.loadingsData.loading,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { removeData })(TableHeader);