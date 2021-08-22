import React from 'react';


type UseOnBeforeUnloadReturn = {
  clearUnload: () => void,
}

export const useOnBeforeUnload = (dependencies: React.DependencyList): UseOnBeforeUnloadReturn => {
  const clearUnload = () => {
    window.onbeforeunload = null;
  };

  React.useEffect(() => {
    window.onbeforeunload = (e) => {
      e.preventDefault();
      return (e.returnValue = '');
    };

    return clearUnload;
  }, dependencies);

  return {clearUnload};
};
