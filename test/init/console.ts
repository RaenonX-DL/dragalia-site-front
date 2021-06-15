export const initMockConsoleBehavior = () => {
  if (!process.env.CI) {
    // Use default console behavior if not in CI mode
    return;
  }

  const originalErrorFn = console.error;

  console.error = (...data: any[]) => {
    // Skips displaying error starting with `Warning:`
    //   Mainly suppresses warning of no-op React and wrap-in-act from React
    const errorMessage = data[0];
    if (errorMessage.startsWith('Warning:')) {
      return;
    }

    originalErrorFn(...data);
  };
};
