let curId = 0;      // id of dispatch

let ACTION_ID = 0;  // action id

export const ACTION = {
  SHOW: ACTION_ID++,
  DESCRIBE: ACTION_ID++,
};

export const show = show => ({
  type: ACTION.SHOW,
  id: curId++,
  show,
});

export const describe = modal => ({
  type: ACTION.DESCRIBE,
  id: curId++,
  modal,
});

