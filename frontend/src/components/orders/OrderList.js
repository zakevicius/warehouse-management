import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import Table from '../elements/Table';

class OrderList extends Component {
    componentDidMount() {
        this.props.setActiveTab('orders');
        if (!this.props.ordersToShow) {
            this.props.fetchData('/orders');
        }
    }

    render() {
        let orders;
        console.log(this.props)
        if (!this.props.ordersToShow) {
            orders = this.props.orders;
        } else {
            orders = this.props.ordersToShow;
        }
        return (
            <Table
                type="orders"
                orders={orders}
                page={this.props.match ? this.props.match.params.no : this.props.page || null}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.ordersData,
        user: state.user,
    };
}

export default connect(mapStateToProps, { fetchData, setActiveTab })(OrderList);