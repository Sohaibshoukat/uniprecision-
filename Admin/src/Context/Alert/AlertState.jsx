import React, { useState } from 'react';

// Remove the import for AlertContext
// import AlertContext from './AlertContext';

// Instead, you can directly import the AlertContext from the file where it is created and exported
import AlertContext from './AlertContext';

const AlertState = (props) => {
  const initialvalue = null;
  const [alert, setAlert] = useState(initialvalue);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert }}>
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
