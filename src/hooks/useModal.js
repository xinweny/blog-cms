import { useState } from 'react';

const useModal = () => {
  const [options, setOptions] = useState({
    show: false,
    action: null,
  });
  
  return [options, setOptions];
};

export default useModal;