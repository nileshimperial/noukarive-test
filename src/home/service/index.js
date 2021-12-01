import {CONFIG} from './url';

const STATUS_CODES = {
  SUCCESS: 200,
};

export function sendEmailApi(body) {
  return fetch(CONFIG.API_URL, {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => res);
}

export function isResponseSuccess(response) {
  return !!response.status === STATUS_CODES.SUCCESS;
}
