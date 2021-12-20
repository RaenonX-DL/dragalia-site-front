import userEvent from '@testing-library/user-event';


type TypeInputOptions = {
  rerender: () => void,
  clear?: boolean,
};

export const typeInput = (element: Element, text: string, options: TypeInputOptions) => {
  if (options?.clear) {
    userEvent.clear(element);
    options.rerender();
  }

  [...text].forEach((char) => {
    userEvent.type(element, char);
    options.rerender();
  });
};
