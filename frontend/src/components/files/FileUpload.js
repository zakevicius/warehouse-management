import React, { Component, Fragment } from 'react';
import { uploadFiles, addFile, removeFile, clearFiles } from '../../action';
import { connect } from 'react-redux';
import Button from '../elements/Button';
import FileList from './FileList';


class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.style = {
      display: "none",
    };
  };

  state = {
    msg: ''
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.props.files.length === 0) {
      this.setState({
        msg: 'No files were selected'
      });
      return;
    }
    const data = new FormData();
    this.props.files.forEach(file => {
      data.append('files', file);
    });
    this.props.uploadFiles(data, this.props.id);
    this.props.clearFiles();
  };

  onChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      this.props.addFile(e.target.files[i]);
    };
  };

  render() {
    console.log(this.props);
    return (
      <Fragment>

        <div className="ui segment">
          <form className="ui form" onSubmit={this.onSubmit} encType="multipart/form-data">
            <div className="ui six wide field">
              <label htmlFor="uploadButton" className="ui inverted primary button">
                <i className="ui upload icon"></i>
                Select Files
            </label>
              <input
                type="file"
                name="file"
                multiple
                style={{ display: "none" }}
                id="uploadButton"
                onChange={this.onChange}
              />
              <FileList files={this.props.files} removeFile={this.props.removeFile} />
              <Button button={{ type: 'primary ', text: 'Submit' }} />
            </div>
          </form>
          {this.state.msg !== '' && (
            <div className="ui tertiary red inverted compact segment">
              {this.state.msg}
            </div>
          )}
        </div>
      </Fragment>
    );
  };
};

const mapStateToProps = state => {
  return {
    files: state.filesData.files
  }
}

export default connect(
  mapStateToProps,
  {
    uploadFiles,
    addFile,
    removeFile,
    clearFiles
  }
)(FileUpload);