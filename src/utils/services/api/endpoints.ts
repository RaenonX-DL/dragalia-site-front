const ApiRoot = process.env.REACT_APP_API_ROOT;

export const getFullApiUrl = (endpoint: string): string => {
  return ApiRoot + endpoint;
};
