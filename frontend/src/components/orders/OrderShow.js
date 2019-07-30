import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData } from '../../action'
import Table from '../elements/Table';

class OrderShow extends Component {

    data = this.props.location.state.data;

    componentDidMount() {
        if (!this.data) {
            this.props.fetchSingleData('/orders', this.props.match.params.id);
        }
    }

    render() {
        return <Table type="order" order={this.data ? this.data.order : this.props.order} />;
    }
}

const mapStateToProps = state => {
    return {
        order: state.ordersData.order
    }
}

export default connect(mapStateToProps, { fetchSingleData })(OrderShow);