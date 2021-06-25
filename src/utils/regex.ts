// Source: https://stackoverflow.com/a/3561711/11571888
export const escapeRegexChars = (src: string) => {
  return src.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};
