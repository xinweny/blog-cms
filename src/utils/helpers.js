import { format, parseISO } from 'date-fns';
import DOMPurify from 'dompurify';

const sendReqMultipart = async (verb, query, formData, token) => {
  const res = await fetch(`https://blog-api-5lv9.onrender.com/api/${query}`, {
    method: verb,
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: formData,
  });

  return res;
};

const sendReqJson = async (verb, query, data, token) => {
  const res = await fetch(`https://blog-api-5lv9.onrender.com/api/${query}`, {
    method: verb,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
    body: JSON.stringify(data),
  });

  return res;
};

const saveDataAndTriggerStorage = json => {
  localStorage.setItem('token', json.data.token);
  localStorage.setItem('user', JSON.stringify(json.data.user));
  window.dispatchEvent(new Event('storage'));
};

const getStorageAuth = () => ({
  user: JSON.parse(localStorage.getItem('user')),
  token: localStorage.getItem('token'),
});

const formatDate = (date, formatString) => format(parseISO(date), formatString);

const sanitize = htmlString => DOMPurify.sanitize(htmlString, {
  USE_PROFILES: { html: true }
});

export {
  sendReqMultipart,
  sendReqJson,
  saveDataAndTriggerStorage,
  getStorageAuth,
  formatDate,
  sanitize,
};