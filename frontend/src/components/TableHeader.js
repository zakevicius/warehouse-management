import React from 'react';

const TableHeader = (props) => {
    switch (props.type) {
        case 'orders':
            return (
                <thead>
                    <tr>
                        <th className="one wide center aligned">Order</th>
                        <th className="one wide center aligned">Date</th>
                        <th className="two wide center aligned">Sender</th>
                        <th className="two wide center aligned">Receiver</th>
                        <th className="one wide center aligned">Truck</th>
                        <th className="one wide center aligned">Trailer</th>
                        <th className="one wide center aligned">CLL</th>
                        <th className="one wide center aligned">Brutto</th>
                        <th className="four wide center aligned">Description</th>
                        <th className="two wide center aligned">Declarations</th>
                    </tr>
                </thead>
            );
        case 'clients':
            return (
                <thead>
                    <tr>
                        <th className="two wide center aligned">First Name</th>
                        <th className="two wide center aligned">Last Name</th>
                        <th className="two wide center aligned">Phone</th>
                        <th className="two wide center aligned">E-mail</th>
                    </tr>
                </thead>
            );
        default:
            return (
                <thead>
                    <tr>
                        <th>Welcome</th>
                    </tr>
                </thead>
            )
    }

};

export default TableHeader;