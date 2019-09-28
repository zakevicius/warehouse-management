import React from 'react';
import { removeData, downloadFile } from '../../action';
import { connect } from 'react-redux';


const File = ({ type, file, downloadFile, ...props }) => {
  const onClickRemove = () => {
    props.removeData('/files', file._id);
  };

  const onClick = (id) => {
    downloadFile(id, file.name)
  }

  const style = {
    color: 'navy',
    cursor: 'pointer'
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
          <span style={style} onClick={() => onClick(file._id)}>{file.name/*.split('___')[1].join('.')[0]*/}</span>
        </p >
      )
    default:
      return null;
  }
};

export default connect(null, { removeData, downloadFile })(File);
