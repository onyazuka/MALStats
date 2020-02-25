import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import modalReducer from './reducers'; 
import * as modalAction from './actions';

/*
  To perform some actions with parent, we are passing 'parent' prop and some state keys to manipulate it.
*/
export function Modal(props) {

  // 'parentStateShowModalKey' - key in parent's state which shows/hides the modal
  const { className, contents, show, onClose, onCancel, onConfirm, outsideClickCloseable } = props;
  useEffect(() => {
    const keyListener = function(event) {
      switch(event.keyCode) {
      // enter
      case 13:
        if(onConfirm) onConfirm();
        break;
      // esc
      case 27:
        if(onCancel) onCancel();
        break;
      }
    };
    document.addEventListener("keydown", keyListener);
    return () => document.removeEventListener("keydown", keyListener);
  });
  const component = show ? 
    // modal container
    <div 
      className="modal-container"
      // closing only if clicked on container, but NOT its children
      onClick={ outsideClickCloseable ? (event) => { if((event.target === event.currentTarget) && onClose) onClose(); } : null }
    >
      <div className={`${className} modal-component`}>
        <div className={`${className}-close modal-component-close`} 
          style={{cursor: "pointer",}} 
          onClick={() => { if(onClose) onClose(); }}
        >
          x
        </div>
        <div className={`${className}-contents modal-component-contents`} >{contents}</div>
      </div> 
    </div>
    : null;
  return component;
  
};

Modal.propTypes = {
  className: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  outsideClickCloseable: PropTypes.bool.isRequired,
  contents: PropTypes.any,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func,    // function or undefined
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
};

Modal.defaultProps = {
  outsideClickCloseable: true,
};

export default {
  Modal: Modal,
  reducer: modalReducer,
  action: modalAction
};