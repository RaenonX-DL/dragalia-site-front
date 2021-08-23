import React from 'react';

import {ExternalLink} from '../../src/components/elements/common/link/external';


const About = () => {
  return (
    <>
      <h3>Source Code</h3>
      <p className="h5">
        <ExternalLink href="https://github.com/RaenonX-DL/dragalia-site-front" newWindow>
          Github Repo (Frontend)
        </ExternalLink>
      </p>
      <p className="h5">
        <ExternalLink href="https://github.com/RaenonX-DL/dragalia-site-back-2" newWindow>
          Github Repo (Backend)
        </ExternalLink>
      </p>
      <p className="h6">
        <ExternalLink href="https://github.com/RaenonX-DL/dragalia-site-back" newWindow>
          Github Repo (Backend - Deprecated)
        </ExternalLink>
      </p>
      <hr/>
      <h3>Others</h3>
      <p className="h5">
        <ExternalLink href="https://twitter.com/gonzarez1938/status/1424390835240529921" newWindow>
          Website Icon
        </ExternalLink>
      </p>
    </>
  );
};

export default About;
