import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Step2 = ({ title, fileName, videoUrl, findFileInput, waiting, handleInput, handleSubmit, closeModal }) => {
    const publishButton = (title && !waiting) ? (
    <button className='publish' onClick={handleSubmit}>PUBLISH</button>
    ) : ( (waiting) ? (
     <button className='publish disabled waiting-publish' >PUBLISH</button>) : (
    <button className='publish disabled' >PUBLISH</button>   
     ));

    const titleError = (title.length) ? 'title' : 'title-error';
    return (
        <div className='upload-step'>
            <div className='upload-top'>
                <h2>{title}</h2>
                <FontAwesomeIcon className='close-upload' icon={faTimes} onClick={closeModal} />
            </div>

            <section className='upload-content-2'>
                <section className='upload-details'>
                    <h2>Details</h2>
                    <div className={`textarea-container ${titleError}`}>
                    <div className='outer-textarea'>
                    <p className='title-textarea-header'>Title (required)</p>
                    <textarea className="upload-textarea" cols="30" rows="10" placeholder='Add a title that describes your video' onChange={handleInput('title')} value={title}></textarea>
                    </div>
                    </div>

                    <div className='textarea-container description'>
                        <div className='outer-textarea'>
                            <p className='description-textarea-header'>Description</p>
                            <textarea className='upload-textarea' cols="30" rows="10" placeholder='Tell viewers about your video' onChange={handleInput('description')}></textarea>    
                        </div>
                    </div>
                </section>
                <section className='upload-mini-player'>
                    <div className='description-mini-player-container'>
                        <video src={videoUrl} controls></video>
                    </div>
                    <div className='video-info'>
                        <p>Filename</p>
                        <h4>{fileName}</h4>
                    </div>
                </section>
            </section>
           
                <div className="publish-button-container">
                {publishButton}
                </div>
        </div>
    )
};

export default Step2;