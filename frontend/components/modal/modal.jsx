import React from 'react';
import CreateVideo from '../videos/video_upload/video_upload_container';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }

    let component;
    let childClass;

    switch(modal) {
        case 'createVideo':
            component = <CreateVideo />;
            childClass= 'modal-child'
            break;
    }

    return (
        <div className="modal-background" onClick={closeModal}>
            <div className={childClass} onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    )
};

export default Modal;