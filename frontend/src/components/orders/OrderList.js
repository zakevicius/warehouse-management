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
        const orders = this.props.ordersToShow || this.props.orders;
        return (
            <Table type="orders" orders={orders} />
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.ordersData,
    };
}

export default connect(mapStateToProps, { fetchData, setActiveTab })(OrderList);