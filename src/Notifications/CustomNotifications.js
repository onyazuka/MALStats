import React from 'react';    // for JSX
import TC from 'haniwa-type-checker';

/*
  WARNING! Values should be strings! They are used as parts of className.
*/
export const NOTIFICATION_TYPE = {
  ERROR: "error",
  PUBLISHED: "published"
};

function sendNotification(type) {
  // info can be array of errors or object 
  return function(notificationFunction, message, info) {
    notificationFunction({ type: type, contents:
      <div>
        <p>{message}</p>
        {info ? 
          TC.isArray(info) ? info.map((text, index) => <p key={index}>{text}</p>) :
          TC.isObject(info) ? Object.keys(info).map((key, index) => <p key={index}>{key + ": " + info[key]}</p>) : 
        null : null}
      </div>
    });
  }
}

// info is array of strings
export function sendErrorNotification(notificationFunction, message, info) {
  return sendNotification(NOTIFICATION_TYPE.ERROR)(notificationFunction, message, info);
}

// info is array of strings
export function sendPublishedNotification(notificationFunction, message, info) {
  return sendNotification(NOTIFICATION_TYPE.PUBLISHED)(notificationFunction, message, info);
}

