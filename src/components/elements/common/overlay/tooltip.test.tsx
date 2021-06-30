import React from 'react';

import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {OverlayTooltip} from './tooltip';


describe('Tooltip overlay behavior', () => {
  it('shows/hides text on hover/leave', async () => {
    const popUpText = 'pop';
    const overlayText = 'overlay';

    render(
      <OverlayTooltip text={popUpText} key={popUpText}>
        <span>{overlayText}</span>
      </OverlayTooltip>,
    );

    const mainOverlay = screen.getByText(overlayText);

    userEvent.hover(mainOverlay);
    expect(screen.getByText(popUpText)).toBeInTheDocument();

    userEvent.unhover(mainOverlay);
    await waitFor(() => expect(screen.queryByText(popUpText)).not.toBeInTheDocument());
  });
});
