import React from 'react';

import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {OverlayTooltip} from './tooltip';

describe('Tooltip overlay behavior', () => {
  it('shows/hides text on hover/leave', async () => {
    const popUpText = 'pop';
    const overlayText = 'overlay';

    render(
      <OverlayTooltip text={popUpText}>
        <span>{overlayText}</span>
      </OverlayTooltip>,
    );

    const mainOverlay = screen.getByText(overlayText);

    userEvent.hover(mainOverlay);
    await waitFor(() => mainOverlay);

    // Check if the pop up shows
    expect(screen.getByText(popUpText)).toBeInTheDocument();

    userEvent.unhover(mainOverlay);
    await waitFor(() => {
      // Check if the pop up hides
      expect(screen.queryByText(popUpText)).not.toBeInTheDocument();
    });
  });
});
