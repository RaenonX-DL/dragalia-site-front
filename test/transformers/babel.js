'use strict';

const babelJest = require('babel-jest');


const hasJsxRuntime = (() => {
  try {
    require.resolve('react/jsx-runtime');
    return true;
  } catch (e) {
    return false;
  }
})();

module.exports = babelJest.default.createTransformer({
  presets: [
    [
      require.resolve('babel-preset-react-app'),
      {runtime: hasJsxRuntime ? 'automatic' : 'classic'},
    ],
  ],
});
