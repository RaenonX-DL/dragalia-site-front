import {Components} from 'react-markdown/src/ast-to-react';

import {renderLink} from './components/link';
import {renderText} from './components/text';


// Key correspondences:
// https://github.com/remarkjs/react-markdown/blob/main/changelog.md#600---2021-04-15

// Ignoring ts compilation errors because some props are expected but undefined in type definitions.
export const components: Components = {
  // @ts-ignore
  a: renderLink,
  p: renderText,
};
