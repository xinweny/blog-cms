import React from 'react';
import { PropTypes as PT } from 'prop-types';

import '../../styles/Counter.css';

function Counter({ children, number }) {
  return (
    <div className="counter">
      {children}
      <div className="counter-number">{number}</div>
    </div>
  )
}

Counter.propTypes = {
  children: PT.elementType,
  number: PT.number.isRequired,
}

export default Counter;