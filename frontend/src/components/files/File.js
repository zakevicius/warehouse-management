import React from 'react';
import { removeData } from '../../action';
import { connect } from 'react-redux';


const File = ({ type, file, ...props }) => {
  console.log(file);
  const onClick = () => {
    props.removeData('/files', file._id);
  };

  switch (type) {
    case "addRemove":
      console.log(file);
      return (
        <p key={file._id}>
          <i className="ui large link close red icon" onClick={() => props.removeFile(file)} />
          {file.name/*.split('.').length === 2 ? file.name.split('.')[0] : file.name.split('.').slice(0, -1).join('.')*/}
        </p>
      );
    case "photo":
    case "document":
      console.log(file);
      return (
        <p key={file._id}>
          <i className="ui large link close red icon" onClick={onClick} />
          {file.name/*.split('___')[1].join('.')[0]*/}
        </p>
      )
    default:
      return null;
  }
};

export default connect(null, { removeData })(File);
