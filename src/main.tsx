import React, {useEffect} from 'react';

import {Container} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';

import {Footer, GlobalAlert, Navigation} from './components/elements';
import {useI18n} from './i18n/hook';
import {PageContent} from './pages/main';
import {SiteAlert} from './siteAlert';
import {ReduxProvider, ReduxProviderProps} from './state/provider';
import {GoogleAnalytics} from './utils/services/ga';


const PageMain = () => {
  const {t} = useI18n();
  const location = useLocation();

  const ref = React.useRef<HTMLHeadingElement>(null) as React.MutableRefObject<HTMLHeadingElement>;
  const title = React.useRef<string>(t((t) => t.meta.inUse.site.title));

  const updatePageTitle = (newTitle?: string, isFound = true) => {
    newTitle = newTitle || t((t) => t.meta.inUse.site.title);

    if (!newTitle) {
      newTitle = '';
    }

    // Set the title element and the document title
    title.current = newTitle;
    document.title = newTitle + t((t) => t.meta.suffix);

    if (ref.current) {
      // Title element linked, set new title to it & record the page title
      ref.current.innerText = newTitle;

      // This needs to be placed after the document title update because
      // this method sends the current page title.
      if (isFound) {
        GoogleAnalytics.pageView(location.pathname);
      } else {
        GoogleAnalytics.pageViewFailed('not_found', location.pathname);
      }
    }
  };

  // After the page render completed
  useEffect(() => {
    // Ensure that the title has been set
    document.title = title.current;
    ref.current.innerText = title.current;
  });

  return (
    <>
      <Navigation ref={ref}/>
      <SiteAlert/>
      <Container className="p-3">
        <GlobalAlert/>
        <PageContent updatePageTitle={updatePageTitle}/>
      </Container>
      <Footer/>
    </>
  );
};

const Main = (props: ReduxProviderProps) => {
  return (
    <ReduxProvider {...props}>
      <PageMain/>
    </ReduxProvider>
  );
};

export default Main;
