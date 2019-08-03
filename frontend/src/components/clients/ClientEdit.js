import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '../elements/Table';

class ClientEdit extends Component {

    render() {
        return (
            <Table
                type='clientEdit'
                client={this.props.client}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        client: state.clientsData.client
    };
};

export default connect(mapStateToProps, {})(ClientEdit);