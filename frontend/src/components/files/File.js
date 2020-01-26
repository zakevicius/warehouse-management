import React from "react";
import { removeData, downloadFile } from "../../action";
import { connect } from "react-redux";
import Modal from "../elements/Modal";

const File = ({ type, file, downloadFile, src, onClickPhoto, ...props }) => {
  const onClickRemove = id => {
    props.removeData("/files", id, props.typeOfData);
  };

  const onClick = id => {
    downloadFile(id, file.name);
  };

  const styleSpan = {
    cursor: "pointer"
  };

  const styleAddRemoveP = {
    marginRight: "2em",
    overflow: "hidden",
    width: "10em"
  };

  const styleP = {
    margin: "1em",
    display: "flex",
    flexWrap: "wrap",
    width: "10em"
  };

  const imageDiv = {
    flexBasis: "100%",
    height: "7em",
    cursor: "pointer",
    overflow: "hidden",
    marginBottom: "1em",
    borderRadius: "5px",
    boxShadow:
      "4px 4px 8px 0 rgba(0, 0, 0, 0.2), 6px 6px 10px 0 rgba(0, 0, 0, 0.19)"
  };

  const styleImg = {
    position: "relative",
    width: "100%",
    height: "auto"
  };

  switch (type) {
    case "addRemove":
      return (
        <div style={{ display: "flex" }}>
          <p key={file._id} style={styleAddRemoveP}>
            <i
              className="ui large link close red icon"
              onClick={() => props.removeFile(file)}
            />
            {file.name}
          </p>
        </div>
      );
    case "photo":
      return (
        <div key={file._id} style={styleP}>
          <Modal confirm={() => onClickRemove(file._id)} />
          <div className="imageDiv" style={imageDiv}>
            <img
              src={`data:image/png;base64, ${file.src}`}
              style={styleImg}
              onClick={() => onClickPhoto(file._id)}
            />
          </div>
          {props.userType === "admin" || props.userType === "super" ? (
            <i
              className="ui large link close red icon"
              onClick={props.showModal}
            />
          ) : (
            <i className="file alternate outline icon" />
          )}
          <span style={styleSpan} onClick={() => onClick(file._id)}>
            {file.name.split(".")[0].split("___")[1]}
          </span>
        </div>
      );
    case "document":
      return (
        <div key={file._id} style={styleP}>
          {props.userType === "admin" || props.userType === "super" ? (
            <i
              className="ui large link close red icon"
              onClick={props.showModal}
            />
          ) : (
            <i className="file alternate outline icon" />
          )}
          <Modal confirm={() => onClickRemove(file._id)} />
          <span style={styleSpan} onClick={() => onClick(file._id)}>
            {file.name.split(".")[0].split("___")[1]}
          </span>
        </div>
      );
    default:
      return null;
  }
};

const mapStateToProps = state => {
  return {
    userType: state.auth.user.type
  };
};

export default connect(mapStateToProps, {
  removeData,
  downloadFile
})(File);
