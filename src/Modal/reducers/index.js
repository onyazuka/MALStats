import { ACTION } from '../actions'

const DEFAULT_MODAL_STATE = {
  show: false,
  contents: null,
  onClose: undefined,
  onCancel: undefined,
  onConfirm: undefined,
};

function modalReducer(state = DEFAULT_MODAL_STATE, action) {
  switch(action.type) {
  case ACTION.SHOW: 
    return {
      ...state,
      show: action.show,
    };
  case ACTION.DESCRIBE:
    return {
      ...state,
      ...action.modal,
    };
  default:
    return { ...state };
  }
}

export default {
  initState: DEFAULT_MODAL_STATE,
  reducer: modalReducer,
};

