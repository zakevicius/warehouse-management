import React from 'react';
import Table from '../elements/Table';

const LoadingOrderListCreate = (props) => {
    if (props.orders) {
        return (
            <Table
                type="loadingOrderListCreate"
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

export default LoadingOrderListCreate;