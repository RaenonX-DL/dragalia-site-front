import {RenderResult} from '@testing-library/react';
import {ReactWrapper} from 'enzyme';

import {ReduxStore} from '../../src/state/store';

export type RenderReturns = {
  app: ReactWrapper,
  store: ReduxStore,
}

export type RenderReactReturns = {
  app: RenderResult,
  store: ReduxStore,
}
