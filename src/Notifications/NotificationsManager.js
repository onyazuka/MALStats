import React, { Component } from 'react';
import Notification from './Notijication';
import TC from 'haniwa-type-checker';

const DEFAULT_NOTIFICATION_TIMEOUT = 5000;   // ms

const ACTION = {
  INCREMENT_NOTIFICATION_ID: 0,
  ADD_NOTIFICATION: 1,
  DELETE_NOTIFICATION: 2,
}

/*
  Notifiable component should use this reducer and set its initial state itself.
*/
export function notificationReducer(state, action) {
  switch(action.type) {
  case ACTION.INCREMENT_NOTIFICATION_ID:
    return {
      ...state,
      curNotificationId: state.curNotificationId + 1,
    }
  case ACTION.ADD_NOTIFICATION:
    return { 
      ...state,
      notifications: {
        ...state.notifications,
        [state.curNotificationId]: action.notification,
      } 
    };
  case ACTION.DELETE_NOTIFICATION:
    const newNotifications = Object.assign({}, state.notifications);
    delete newNotifications[action.deleteNotificationId];
    return {
      ...state,
      notifications: newNotifications,
    }
  default:
    throw Error(`notificationReducer - unknown action type '${action.type}'`);
  }
}

/*
  Convenience function that incapsulates all notification logic.
  Notifiable components should use it!
*/
export function notify(state, dispatch) {
  return function(notification, timeout=DEFAULT_NOTIFICATION_TIMEOUT) {
    const curNotificationId = state.curNotificationId;
    dispatch({
      type: ACTION.ADD_NOTIFICATION,
      notification,
    });
    dispatch({ type: ACTION.INCREMENT_NOTIFICATION_ID, });
    // deleting current notificaiton after timeout
    setTimeout(() => {
      dispatch({
        type: ACTION.DELETE_NOTIFICATION,
        deleteNotificationId: curNotificationId,
      });
    }, timeout);
  }
}

export default function NotificationsManager(props) {
  const { classPrefix } = props;
  const notifications = Object.keys(props.notifications).map(id => {
    return (
      <Notification 
        className="notification"
        key={ id }
        type={ props.notifications[id].type }
      >
        { props.notifications[id].contents }
      </Notification>
  )});
  return <div className={`${classPrefix} notifications`}>{ notifications }</div>;
}
