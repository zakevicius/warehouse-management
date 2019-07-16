import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import Table from '../elements/Table';

class OrderList extends Component {
    componentDidMount() {
        this.props.setActiveTab('orders');
        this.props.fetchData('/orders');
    }

    render() {
        return (
            <Table type="orders" orders={this.props.orders} />
        );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.ordersData,
    };
}

export default connect(mapStateToProps, { fetchData, setActiveTab })(OrderList);