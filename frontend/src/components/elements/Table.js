import React, { Fragment } from 'react';
import TableHeader from './TableHeader';
import TableData from './TableData';

const Table = (props) => {
  return (
    <Fragment>
      <table className="ui celled striped table segment">
        <TableHeader type={props.type} />
        <TableData
          type={props.type}
          client={props.client}
          clients={props.clients}
          order={props.order}
          orders={props.orders}
          loadings={props.loadings}
          page={props.page}
          url={props.url}
        />
      </table>
    </Fragment>
  );
};


export default Table;
