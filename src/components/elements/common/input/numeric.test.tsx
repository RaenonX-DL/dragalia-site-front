import React from 'react';

import {screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {renderReact} from '../../../../../test/render/main';
import {typeInput} from '../../../../../test/utils/event';
import {NumericInput} from './numeric';


const NumInput = () => {
  const [input, setInput] = React.useState(1);

  return (
    <NumericInput
      title="title"
      description="desc"
      inputData={input}
      setInputData={setInput}
      getValue={(input) => input || 0}
      getUpdatedInputData={(newValue) => newValue}
    />
  );
};

describe('Numeric input', () => {
  it('removes additional zeros when the input is cleared and re-entered', async () => {
    const {rerender} = renderReact(() => <NumInput/>);

    const input = screen.getByDisplayValue('1');

    userEvent.type(input, '{backspace}');
    typeInput(input, '0', {rerender});
    expect(await screen.findByDisplayValue('0')).toBeInTheDocument();

    typeInput(input, '1', {rerender});
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });
});
