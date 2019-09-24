import React from 'react';
import { removeData, downloadFile } from '../../action';
import { connect } from 'react-redux';


const File = ({ type, file, ...props }) => {
  const onClickRemove = () => {
    props.removeData('/files', file._id);
  };

  const onClickDonwload = () => {
    downloadFile(file);
  }

  switch (type) {
    case "addRemove":
      return (
        <p key={file._id}>
          <i className="ui large link close red icon" onClick={() => props.removeFile(file)} />
          {file.name/*.split('.').length === 2 ? file.name.split('.')[0] : file.name.split('.').slice(0, -1).join('.')*/}
        </p>
      );
    case "photo":
    case "document":
      return (
        <p key={file._id} >
          <i className="ui large link close red icon" onClick={onClickRemove} />
          <a href={`ftp://192.168.1.178/${file.path.split('C:/files/')[1]}`}>{file.name/*.split('___')[1].join('.')[0]*/}</a>
        </p>
      )
    default:
      return null;
  }
};

export default connect(null, { removeData, downloadFile })(File);
