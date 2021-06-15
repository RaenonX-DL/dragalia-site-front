// https://github.com/vercel/next.js/discussions/15687#discussioncomment-45319
import {Storage} from 'redux-persist/es/types';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';


const createNoopStorage = (): Storage => {
  return {
    getItem: (_) => {
      return Promise.resolve(null);
    },
    setItem: (_, value) => {
      return Promise.resolve(value);
    },
    removeItem: (_) => {
      return Promise.resolve();
    },
  };
};

const storage: Storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export default storage;
