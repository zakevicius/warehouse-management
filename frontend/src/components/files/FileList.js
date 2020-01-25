import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { showModal } from "../../action";
import File from "./File";
import Spinner from "../elements/Spinner";
import ImageModal from "./ImageModal";

class FileList extends Component {
  onClickPhoto = id => {
    this.props.showModal("image", id);
  };

  renderAddRemoveFileList = files => {
    if (!files || files.length === 0) {
      return <div style={{ padding: "10px 0" }}>No files</div>;
    } else {
      return (
        <div style={{ padding: "10px 0", display: "flex" }}>
          {files.map(file => (
            <File
              key={file.name}
              file={file}
              type="addRemove"
              removeFile={this.props.removeFile}
            />
          ))}
        </div>
      );
    }
  };

  showFiles = ({ photos, documents }) => {
    if (this.props.files.load) return <Spinner />;
    const renderPhotos = () => {
      if (!photos || photos.length === 0 || photos[0].length === 0) {
        return <div>No photos</div>;
      } else {
        return photos.map(file => (
          <File
            key={file._id}
            file={file}
            type="photo"
            typeOfData={this.props.typeOfData}
            src={file.src}
            onClickPhoto={this.onClickPhoto}
          />
        ));
      }
    };

    const renderDocuments = () => {
      if (!documents || documents.length === 0) return <div>No Documents</div>;
      return documents.map(file => (
        <File
          key={file._id}
          file={file}
          type="document"
          typeOfData={this.props.typeOfData}
        />
      ));
    };

    return (
      <Fragment>
        <div>
          <h4 style={{ marginTop: 10 }}>Photos</h4>
          <div
            className="ui segment"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {renderPhotos()}
          </div>
        </div>
        <div>
          <h4 style={{ marginTop: 10 }}>Documents</h4>
          <div
            className="ui segment"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {renderDocuments()}
          </div>
        </div>
      </Fragment>
    );
  };

  renderFileList = (files, type) => {
    switch (type) {
      case "addRemoveFiles":
        return this.renderAddRemoveFileList(files.filesToUpload);
      case "showFiles":
        return this.showFiles(files.files);
      default:
        return;
    }
  };

  render() {
    const { files, type } = this.props;
    return (
      <Fragment>
        {files.files.photos && <ImageModal images={files.files.base64} />}
        {this.renderFileList(files, type)}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    files: state.filesData
  };
};
export default connect(mapStateToProps, { showModal })(FileList);
