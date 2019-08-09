import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import Table from '../elements/Table';

class ClientOrderList extends Component {
    componentDidMount() {
        this.props.setActiveTab('orders');
    }

    render() {
        let orders;

        orders = this.props.ordersToShow;

        return (
            <Table
                type="orders"
                orders={orders}
                page={this.props.match ? this.props.match.params.no : this.props.page || null}
                url={this.props.url ? this.props.url : '/orders/'}
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

export default connect(mapStateToProps, { fetchData, setActiveTab })(ClientOrderList);