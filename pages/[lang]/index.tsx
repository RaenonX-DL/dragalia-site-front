import React from 'react';

import {Markdown} from '../../src/components/elements/markdown/main';
import {useI18n} from '../../src/i18n/hook';


const Home = () => {
  const {t} = useI18n();

  return (
    <Markdown>
      {t((t) => t.message.info.welcome)}
    </Markdown>
  );
};

export default Home;
