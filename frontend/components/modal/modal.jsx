import React from 'react';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }

    let component;

    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>

            </div>
        </div>
    )
};

export default Modal;