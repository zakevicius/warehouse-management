import React, { Component, Fragment } from "react";
import {
  uploadFiles,
  addFileToUploadList,
  removeFileFromUploadList,
  clearFiles,
  clearError,
  fetchData
} from "../../action";
import { connect } from "react-redux";
import Button from "../elements/Button";
import FileList from "./FileList";
import Error from "../elements/Error";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.style = {
      display: "none"
    };
  }

  state = {
    msg: ""
  };

  componentDidMount() {
    this.props.clearError("/files");
    this.props.clearFiles();
  }

  onSubmit = async e => {
    this.props.clearError("/files");
    e.preventDefault();
    if (this.props.files.length === 0) {
      this.setState({
        msg: "No files were selected"
      });
      return;
    }

    const data = new FormData();
    this.props.files.forEach(file => {
      data.append("files", file);
    });

    await this.props.uploadFiles(data, this.props.id, this.props.typeOfData);
    this.props.clearFiles();
    await this.props.fetchData("/files", this.props.id);
  };

  onChange = e => {
    for (let i = 0; i < e.target.files.length; i++) {
      this.props.addFileToUploadList(e.target.files[i]);
    }
  };

  render() {
    return (
      <Fragment>
        <div className="ui segment">
          <form
            className="ui form"
            onSubmit={this.onSubmit}
            encType="multipart/form-data"
          >
            <div className="ui six wide field">
              <FileList
                files={this.props.files}
                removeFile={this.props.removeFileFromUploadList}
                type="addRemoveFiles"
              />
              {this.props.error && <Error error={this.props.error} />}
              <label
                htmlFor="uploadButton"
                className="ui inverted primary button"
                style={{ width: "200px" }}
              >
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
              <Button
                button={{
                  type: "primary ",
                  text: "Submit",
                  style: { width: "200px" }
                }}
              />
            </div>
          </form>
          {this.state.msg !== "" && (
            <div className="ui tertiary red inverted compact segment">
              {this.state.msg}
            </div>
          )}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    files: state.filesData.filesToUpload,
    error: state.filesData.error
  };
};

export default connect(mapStateToProps, {
  uploadFiles,
  addFileToUploadList,
  removeFileFromUploadList,
  clearFiles,
  clearError,
  fetchData
})(FileUpload);
