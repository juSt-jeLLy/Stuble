import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

const Alert = () => {
  const { alert } = useContext(AppContext);

  const capitalize = (word) => {
    if (!word) return '';
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <>
      {alert && (
        <div
          className={`alert alert-${alert.type}`}
          role="alert"
          style={{ minHeight: '50px' }}
        >
          <strong>{capitalize(alert.type)}</strong> {alert.msg}
        </div>
      )}
    </>
  );
};

export default Alert;
