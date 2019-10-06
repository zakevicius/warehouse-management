import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import File from './File';
import Spinner from '../elements/Spinner';

class FileList extends Component {
  renderAddRemoveFileList = (files) => {
    if (!files || files.length === 0) return <div>No files</div>;
    return files.map(file => <File key={file._id} file={file} type="addRemove" removeFile={this.props.removeFile} />)
  };

  showFiles = ({ photos, documents }) => {
    const renderPhotos = () => {
      if (!photos || photos.length === 0 || photos[0].length === 0) return <div>No photos</div>;
      return photos.map(file => <File key={file._id} file={file} type="photo" />);
    };

    const renderDocuments = () => {
      if (!documents || documents.length === 0) return <div>No Documents</div>;
      return documents.map(file => <File key={file._id} file={file} type="document" />);
    };

    return (
      <Fragment>
        <div>
          <h4>Photos</h4>
          <div className="ui segment" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {renderPhotos()}
          </div>
        </div>
        <div>
          <h4>Documents</h4>
          <div className="ui segment" style={{ display: 'flex', flexWrap: 'wrap' }}>
            {renderDocuments()}
          </div>
        </div>
      </Fragment>
    )
  }

  renderFileList = (files, type) => {
    switch (type) {
      case "addRemoveFiles":
        return this.renderAddRemoveFileList(files.filesToUpload);
      case "showFiles":
        return this.showFiles(files.files);
      default:
        return;
    }
  }

  render() {
    const { files, type } = this.props;
    return !this.props.files ? <Spinner /> : (
      <Fragment>
        {this.renderFileList(files, type)}
      </Fragment>
    )
  };
}

const mapStateToProps = state => {
  return ({
    files: state.filesData,
    load: state.eventsData.load
  })
}
export default connect(mapStateToProps, {})(FileList);