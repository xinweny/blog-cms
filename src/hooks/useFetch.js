import { useState, useEffect } from 'react';

const useFetch = (query, deps = []) => {
  const [data, setData] = useState();

  useEffect(() => {
    if (query) {
      fetch(`https://blog-api-5lv9.onrender.com/api/${query}`)
      .then(res => res.json())
      .then(json => setData(json.data));
    }
  }, deps);

  return [data, setData];
};

export default useFetch;