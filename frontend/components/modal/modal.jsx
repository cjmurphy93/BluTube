import React from 'react';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }

    let component;
    let childClass;

    switch(modal) {
        
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