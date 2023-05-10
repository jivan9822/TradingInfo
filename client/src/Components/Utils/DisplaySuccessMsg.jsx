import React from 'react';
import classes from './Backdrop.module.css';

const DisplaySuccessMsg = ({ text, onClose, redirectMsg }) => {
  return (
    <div className={classes.backdrop} onClick={onClose}>
      <div className={classes.content} style={{ cursor: 'pointer' }}>
        <p>{text}</p>
        <h3>{redirectMsg || 'Click To Continue...'}</h3>
      </div>
    </div>
  );
};

export default DisplaySuccessMsg;
