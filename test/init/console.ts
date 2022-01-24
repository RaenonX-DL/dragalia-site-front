import {isCi} from '../../src/api-def/utils';


export const initMockConsoleBehavior = () => {
  if (!isCi()) {
    // Use default console behavior if not in CI mode
    return;
  }

  const originalErrorFn = console.error;
  const originalWarningFn = console.warn;

  console.error = (...data: any[]) => {
    // Skips displaying some error messages
    //  - Suppresses warning of no-op React and wrap-in-act from React
    //  - Suppresses error of `navigation` not implemented
    const errorMessage = data[0];
    if (typeof errorMessage !== 'string') {
      originalErrorFn(...data);
      return;
    }

    // - `Warning:`: mostly coming from wrapping with act
    // - `Error: Not implemented:`: navigation in jsdom
    if (errorMessage.startsWith('Warning:') || errorMessage.startsWith('Error: Not implemented:')) {
      return;
    }

    originalErrorFn(...data);
  };

  console.warn = (...data: any[]) => {
    // Skips displaying some warning messages
    //  - Suppresses warning from `react-timeago` of invalid date
    const warningMessage = data[0];
    if (typeof warningMessage !== 'string') {
      originalWarningFn(...data);
      return;
    }

    // - `[react-timeago] Invalid Date provided`: doesn't matter during test
    // - `The width(0) and height(0) of chart should be greater than 0`: 1st line of the `recharts` warning
    if (
      warningMessage.startsWith('[react-timeago] Invalid Date provided') ||
      warningMessage.startsWith('The width(0) and height(0) of chart should be greater than 0')
    ) {
      return;
    }

    originalWarningFn(...data);
  };
};
