import React from 'react';
import Table from '../elements/Table';

const LoadingOrderListCreate = (props) => {
    const setColor = () => {
        if (props.action) {
            if (props.action === 'remove') {
                return 'teal';
            } else {
                return 'orange';
            }
        } else {
            return 'black';
        }
    }

    if (props.orders) {
        return (
            <Table
                type="loadingOrderListCreate"
                orders={props.orders}
                action={props.action}
                color={setColor()}
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