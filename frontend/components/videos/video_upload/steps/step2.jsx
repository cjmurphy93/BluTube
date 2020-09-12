import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Step2 = ({ title, fileName, videoUrl, findFileInput, handleInput, handleSubmit, closeModal }) => {
    const disableButton = (title) ? '' : 'disabled';

    return (
        <div>
            <div className='upload-top'>
                <h2>{title}</h2>
                <FontAwesomeIcon icon={faTimes} onClick={closeModal} />
            </div>
            <section className='upload-content-2'>
                <section className='upload-details'>
                    <h2>Details</h2>
                    <p className='title-text-area-title'>Title(required)</p>
                    <textarea className="title-text-area" cols="30" rows="10" placeHolder='Add a title that describes your video' onChange={handleInput('title')} value={title}></textarea>
                    <div className='textarea-description'>
                        <div className='description-container'>
                            <p className='description-input'>Description(optional)</p>
                            <textarea className='description-text' cols="30" rows="10" placeholder='Tell viewers about your video' onChange={handleInput('description')}></textarea>    
                        </div>
                    </div>
                </section>
                <section className='description-mini-player'>
                    <div className='description-mini-player-container'>
                        <video src={videoUrl} controls></video>
                    </div>
                    <div className='video-info'>
                        <p>Filename</p>
                        <h4>{fileName}</h4>
                    </div>
                    <button className={`publish ${disableButton}`} onClick={handleSubmit}>PUBLISH</button>
                </section>
            </section>
        </div>
    )
};

export default Step2;