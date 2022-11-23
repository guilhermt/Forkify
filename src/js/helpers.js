import { TIMEOUT_SEC } from './config';
import { clearBookmarks } from './model';

const timeOut = async function (s) {
  return new Promise(function (_, reject) {
    setTimeout(() => reject(new Error(`${s} seconds have passed`)), s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = uploadData
      ? fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);
    const res = await Promise.race([fetchPro, timeOut(TIMEOUT_SEC)]);
    const data = await res.json();
    if (!res.ok)
      throw new Error(
        `😵: ${data.message} (${data.status}: ${data.statusText})`
      );

    return data;
  } catch (err) {
    throw err;
  }
};

// export const getJSON = async function (url) {
//   try {
//     const res = await Promise.race([fetch(url), timeOut(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok)
//       throw new Error(
//         `😵: ${data.message} (${data.status}: ${data.statusText})`
//       );

//     return data;
//   } catch (err) {
//     console.log('error: ', err);
//     throw err;
//   }
// };

// export const sendJSON = async function (url, uploadData) {
//   try {
//     const fetchPro = fetch(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(uploadData),
//     });

//     const res = await Promise.race([fetchPro, timeOut(TIMEOUT_SEC)]);
//     const data = await res.json();
//     if (!res.ok)
//       throw new Error(
//         `😵: ${data.message} (${data.status}: ${data.statusText})`
//       );

//     return data;
//   } catch (err) {
//     console.log('error: ', err);
//     throw err;
//   }
// };
