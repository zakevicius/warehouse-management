import React from 'react';
import Table from '../elements/Table';

const LoadingOrdersListCreate = (props) => {
    console.log(props)
    if (props.orders) {
        return (
            <Table
                type="loadingOrdersList"
                orders={props.orders.filter(order => order.status === 'in')}
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

export default LoadingOrdersListCreate;