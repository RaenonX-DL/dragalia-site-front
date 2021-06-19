export const initMockConsoleBehavior = () => {
  if (!process.env.CI) {
    // Use default console behavior if not in CI mode
    return;
  }

  const originalErrorFn = console.error;

  console.error = (...data: any[]) => {
    // Skips displaying some error messages
    //  - Suppresses warning of no-op React and wrap-in-act from React
    //  - Suppresses error of `navigation` not implemented
    const errorMessage = data[0];
    if (errorMessage.startsWith('Warning:') || errorMessage.startsWith('Error: Not implemented:')) {
      return;
    }

    originalErrorFn(...data);
  };
};
