import React from 'react';

import {screen, fireEvent, render, waitFor} from '@testing-library/react';

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

    fireEvent.mouseOver(mainOverlay);
    await waitFor(() => mainOverlay);

    // Check if the pop up shows
    expect(screen.getByText(popUpText)).toBeInTheDocument();

    fireEvent.mouseLeave(mainOverlay);
    await waitFor(() => mainOverlay);

    // Check if the pop up hides
    expect(screen.queryByText(popUpText)).not.toBeInTheDocument();
  });
});
