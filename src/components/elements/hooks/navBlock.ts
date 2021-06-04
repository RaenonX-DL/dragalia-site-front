import React from 'react';

import {useRouter} from 'next/router';


const useNavBlock = (
  warningText?: string,
  isEnabled = true,
) => {
  const router = useRouter();

  React.useEffect(() => {
    const handleWindowClose = (e: BeforeUnloadEvent) => {
      if (!isEnabled) return;
      e.preventDefault();
      return (e.returnValue = warningText);
    };

    const handleBrowseAway = () => {
      if (!isEnabled) {
        return;
      }
      if (window.confirm(warningText)) {
        return;
      }
      router.events.emit('routeChangeError');
      throw new Error('routeChange aborted.');
    };

    window.addEventListener('beforeunload', handleWindowClose);
    router.events.on('routeChangeStart', handleBrowseAway);

    return () => {
      window.removeEventListener('beforeunload', handleWindowClose);
      router.events.off('routeChangeStart', handleBrowseAway);
    };
  }, [isEnabled]);
};

export default useNavBlock;
