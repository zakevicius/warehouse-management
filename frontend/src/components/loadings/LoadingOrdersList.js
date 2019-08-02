import React from 'react';
import Table from '../elements/Table';

const LoadingOrdersList = (props) => {
    console.log(props);
    if (props.orders) {
        return (
            <Table
                type="loadingOrdersList"
                orders={props.orders}
                additional={{ addOrderToLoading: props.addOrderToLoading }}
            />
        );
    }
    return null;
}

export default LoadingOrdersList;