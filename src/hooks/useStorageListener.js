import { useState, useEffect } from 'react';

const useStorageListener = key => {
  const [data, setData] = useState();

  useEffect(() => {
    const getData = () => {
      const item = localStorage.getItem(key);
      setData(JSON.parse(item));
    };

    getData();

    window.addEventListener('storage', getData);

    return () => window.removeEventListener('storage', getData);
  }, []);

  return data;
};

export default useStorageListener;