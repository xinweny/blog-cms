import React, { useState } from 'react';
import { PropTypes as PT } from 'prop-types';

import '../../styles/TagInput.css';

function TagInput({ tag, setTags, index }) {
  const [tagValue, setTagValue] = useState(tag || '');

  return (
    <div className="tag-input">
      <input
        type="text"
        id={`tag-${index}`}
        value={tagValue}
        onChange={e => setTagValue(e.target.value)}
        onBlur={() => setTags(prev => {
          const rep = [...prev];
          rep[index] = tagValue;
          return rep;
        })}
      />
      <button
        type="button"
        onClick={() => setTags(prev => prev.slice(0, index).concat(prev.slice(index + 1)))}
      >x</button>
    </div>
  )
}

TagInput.propTypes = {
  tag: PT.string.isRequired,
  setTags: PT.func.isRequired,
  index: PT.number.isRequired,
};

export default TagInput;