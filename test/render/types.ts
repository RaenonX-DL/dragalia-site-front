import {ReactWrapper} from 'enzyme';

import {ReduxStore} from '../../src/state/store';

export type RenderReturns = {
  app: ReactWrapper,
  store: ReduxStore,
}
