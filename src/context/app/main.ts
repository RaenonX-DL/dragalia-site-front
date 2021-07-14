import React from 'react';

import {AppReactContextValue} from './types';


export const AppReactContext = React.createContext<AppReactContextValue | undefined>(undefined);
