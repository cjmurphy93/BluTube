import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleUp, faTimes, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Step1 = ({handleUpload, handleDragOver, handleDrop, closeModal, findFileInput, fileError}) => {
    const renderError = fileError ? 'file-error' : 'no-file-error';

    return (
        <div onDragOver={handleDragOver} onDrop={handleDrop}>
            <div className='upload-top'>
                <h2>Upload Video</h2>
                <FontAwesomeIcon className='close-upload' icon={faTimes} onClick={closeModal} />
            </div>
            <section className='upload-content'>
                <FontAwesomeIcon className='upload-arrow' icon={faArrowCircleUp} />
                <h4 className='drag-instructions'>Drag and drop video files to upload</h4>
                <p className='drag-publish'>Your videos will be private until you publish them.</p>
                <div className={renderError}>
                    <FontAwesomeIcon className='error-triangle' icon={faExclamationTriangle} />
                    <p className='upload-error-msg'>Invalid file format.</p>
                </div>

                <button className='file-button' onClick={findFileInput}>SELECT FILE
                    <input type="file" name='file' id='file' accept='.mp4' onChange={handleUpload}/>
                </button>
            </section>
            <footer className='upload-footer'>
                <span>By submitting your videos to YouTube, you acknowledge that you agree to YouTube's Terms of Service and Community Guidelines.</span>
                <span>Please be sure not to violate others' copyright or privacy rights.</span>
            </footer>
        </div>
    )
};

export default Step1;