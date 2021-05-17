export const isAppOnHeroku = () => {
  return !!process.env.DYNO;
};
