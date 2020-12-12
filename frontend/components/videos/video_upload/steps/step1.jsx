import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  faTimes,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const Step1 = ({
  handleFile,
  handleDragOver,
  handleDrop,
  closeModal,
  findFileInput,
  fileError,
}) => {
  const renderError = fileError ? (
    <div className="file-error">
      <FontAwesomeIcon
        className="error-triangle"
        icon={faExclamationTriangle}
      />
      <p className="upload-error-msg">Invalid file format.</p>
    </div>
  ) : (
    <></>
  );

  return (
    <div
      className="upload-step"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="upload-top">
        <h2>Upload videos</h2>
        <FontAwesomeIcon
          className="close-upload"
          icon={faTimes}
          onClick={closeModal}
        />
      </div>
      <div className="upload-content-container">
        <section className="upload-content">
          <div className="upload-arrow-container" onClick={findFileInput}>
            <FontAwesomeIcon className="upload-arrow" icon={faUpload} />
          </div>
          <h4 className="drag-instructions">
            Drag and drop video files to upload
          </h4>
          <p className="drag-publish">
            Your videos will be private until you publish them.
          </p>
          {renderError}

          <button className="file-button" onClick={findFileInput}>
            SELECT FILE
            <input
              type="file"
              name="file"
              id="file"
              accept=".mp4"
              onChange={handleFile}
            />
          </button>
          <div className="upload-footer">
            <span>
              By submitting your videos to BluTube, you acknowledge that you
              agree to YouTube's Terms of Service and Community Guidelines.
            </span>
            <span className="copyright">
              Please be sure not to violate others' copyright or privacy rights.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Step1;
