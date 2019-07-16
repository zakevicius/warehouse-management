import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData } from '../../action'
import Table from '../elements/Table';
import OrderList from '../orders/OrderList';

class ClientShow extends React.Component {
    componentDidMount() {
        this.props.fetchSingleData('/clients', this.props.match.params.id);
    }

    componentDidUpdate() {
        this.render();
    }

    render() {
        return (
            <div>
                <Table type="client" client={this.props.client} />
                <OrderList orders={this.props.client} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        client: state.clientsData.client,
    };
};

export default connect(mapStateToProps, { fetchSingleData })(ClientShow);