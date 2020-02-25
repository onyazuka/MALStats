import React, { useReducer } from 'react';
import modal from './Modal';

/*
  Typical dialog window with 2 possible answers(question).
  There is not any required props here, but it can be same props, as in Modal component.
  Returns array with size 3:
    0. Modal(dialog) state;
    1. Show/hide(bool) dispatch;
    2. Describe(set contents, show/hide, handlers etc) dispatch.
*/
export default function useQuestionModal(props) {
  // storing state here
  const [modalState, modalDispatch] = useReducer(modal.reducer.reducer, {
    ...modal.reducer.initState,
    ...props,
  });

  // initial handler - just hiding the modal
  const initHandler = () => modalDispatch(modal.action.show(false));

  // descrProps.question needed(dialog question), all others can be the same as in modal reducer
  function describe(descrProps) {
    const onConfirmFunc = () => {
      descrProps.onConfirm();
      initHandler();
    }
    const onCancelFunc = () => {
      descrProps.onCancel();
      initHandler();
    }
    modalDispatch(modal.action.describe({
      show: false,
      contents:
        <>
          <p>{descrProps.question}</p>
          <button 
            className="modal-component-button"
            data-test="Yes"
            onClick={async () => { descrProps.onConfirm ? onConfirmFunc() : initHandler() }}
          >
              Yes
          </button>
          <button 
            className="modal-component-button"
            data-test="No"
            onClick={async () => { descrProps.onCancel ? onCancelFunc() : initHandler() }}
          >
              No
          </button>
        </>,
      onClose: () => initHandler(),
      onConfirm: () => descrProps.onConfirm ? onConfirmFunc() : initHandler(),
      onCancel: () => descrProps.onCancel ? onCancelFunc() : initHandler(),
    })); 
  };

  return [
    modalState,
    (toShow) => modalDispatch(modal.action.show(toShow)),
    describe,
  ];
}
