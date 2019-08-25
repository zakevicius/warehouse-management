import React from 'react'

const FileList = (props) => {
  const renderFileList = (files) => {
    return files.map(file => (
      <p key={file.name}>
        <i className="ui large link close red icon" onClick={() => props.removeFile(file)} />
        {file.name}
      </p>
    ))
  }
  return (
    <div>
      {props.files.length > 0 ? renderFileList(props.files) : <div>No files</div>}
    </div>
  )
}

export default FileList;
