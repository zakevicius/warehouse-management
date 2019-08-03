import React from 'react';
import Table from '../elements/Table';

const LoadingOrdersList = (props) => {
    console.log(props)
    if (props.orders) {
        return (
            <Table
                type="loadingOrdersList"
                orders={props.orders}
                action={props.action}
                additional={
                    {
                        addOrderToLoading: props.addOrderToLoading,
                        removeOrderFromLoading: props.removeOrderFromLoading,
                        action: props.action
                    }
                }
            />
        );
    }
    return null;
}

export default LoadingOrdersList;