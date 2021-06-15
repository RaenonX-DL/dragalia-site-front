export const isAppOnHeroku = () => {
  return !!process.env.DYNO;
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};
