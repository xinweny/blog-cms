import React from 'react';
import { PropTypes as PT } from 'prop-types';

function WarningModal({ options, setOptions, message }) {
  if (!options.show) return null;
  
  return (
    <div>
      <p>{message}</p>
      <button onClick={options.action}>Yes</button>
      <button onClick={() => setOptions(prev => ({ ...prev, show: false }))}>No</button>
    </div>
  );
}

WarningModal.propTypes = {
  options: PT.shape({
    show: PT.bool.isRequired,
    action: PT.func,
  }),
  setOptions: PT.func.isRequired,
  message: PT.string.isRequired,
};

export default WarningModal;