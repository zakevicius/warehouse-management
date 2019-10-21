import React from 'react';
import { removeData, downloadFile } from '../../action';
import { connect } from 'react-redux';


const File = ({ type, file, downloadFile, ...props }) => {
  const onClickRemove = () => {
    props.removeData('/files', file._id);
  };

  const onClick = (id) => {
    downloadFile(id, file.name)
  };

  const styleSpan = {
    cursor: 'pointer',
  };

  const styleP = {
    marginRight: '2em',
    display: 'flex',
    overflow: 'hidden',
    width: '10em'
  };

  switch (type) {
    case "addRemove":
      return (
        <p key={file._id} style={styleP}>
          <i className="ui large link close red icon" onClick={() => props.removeFile(file)} />
          {file.name}
        </p>
      );
    case "photo":
    case "document":
      return (
        <p key={file._id} style={styleP}>
          {props.userType === "admin" || props.userType === 'super' ?
            <i className="ui large link close red icon" onClick={onClickRemove} /> :
            <i className="file alternate outline icon" onClick={onClickRemove} />
          }
          <span style={styleSpan} onClick={() => onClick(file._id)}>{file.name.split('.')[0].split('___')[1]}</span>
        </p >
      )
    default:
      return null;
  }
};

const mapStateToProps = state => {
  return {
    userType: state.auth.user.type
  }
}

export default connect(mapStateToProps, { removeData, downloadFile })(File);
