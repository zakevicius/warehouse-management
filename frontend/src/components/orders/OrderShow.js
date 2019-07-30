import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData } from '../../action'
import Table from '../elements/Table';

class OrderShow extends Component {
    componentDidMount() {
        this.props.fetchSingleData('/api/orders', this.props.match.params.id);
    }

    render() {
        return <Table type="order" order={this.props.order} />;
    }
}

const mapStateToProps = state => {
    return {
        order: state.ordersData.order
    }
}

export default connect(mapStateToProps, { fetchSingleData })(OrderShow);