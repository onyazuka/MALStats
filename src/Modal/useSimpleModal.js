import React, { useReducer } from 'react';
import modal from './Modal';

// Simple modal without any interactive buttons, contents can be custom.
export default function useSimpleModal(props) {
  const initHandler = () => modalDispatch(modal.action.show(false));
  const [modalState, modalDispatch] = useReducer(modal.reducer.reducer, {
    ...modal.reducer.initState,
    onClose: () => initHandler(),
    ...props,
  });

  return [
    modalState,
    (toShow) => modalDispatch(modal.action.show(toShow)),
    (props) => modalDispatch(modal.action.describe(props)),
  ];
}
