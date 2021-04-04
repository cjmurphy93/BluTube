import React from "react";
import CreateVideo from "../videos/video_upload/video_upload_container";
import Sidebar from "../sidebar/sidebar_modal_container";
import Dropdown from "../nav_bar/dropdown";

function Modal({ modal, closeModal }) {
  if (!modal) {
    return null;
  }

  let component;
  let childClass;

  switch (modal) {
    case "createVideo":
      // component = <CreateVideo />;
      // childClass = "modal-child";
      component = (
        <div className="modal-background">
          <div className="modal-child" onClick={(e) => e.stopPropagation()}>
            <CreateVideo />
          </div>
        </div>
      );
      break;
    case "sidebar":
      // component = <Sidebar />;
      // childClass = "modal-child";
      component = (
        <div className="modal-background" onClick={closeModal}>
          <div
            className="modal-child-sidebar"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar />
          </div>
        </div>
      );
      break;
    case "dropdown":
      component = (
        <div className="modal-background dropdown" onClick={closeModal}>
          <div
            className="modal-child-sidebar"
            onClick={(e) => e.stopPropagation()}
          >
            <Dropdown />
          </div>
        </div>
      );
  }

  return (
    // <div
    //   className="modal-background"
    //   // onClick={closeModal}
    // >
    //   <div className={childClass} onClick={(e) => e.stopPropagation()}>
    //     {component}
    //   </div>
    // </div>
    <div>{component}</div>
  );
}

export default Modal;
