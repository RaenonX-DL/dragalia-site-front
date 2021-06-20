export const throwError = (errorMessage: string) => {
  if (process.env.NODE_ENV === 'production') {
    console.warn(errorMessage);
  } else {
    throw new Error(errorMessage);
  }
};
