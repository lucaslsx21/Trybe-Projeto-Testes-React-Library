import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../pages/NotFound';

describe('Teste o componente NotFound.js', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = render(<NotFound />);

    const pageFound = getByRole('heading', {
      name: /Page requested not found/i });
    expect(pageFound).toBeDefined();
  });

  it('Teste se a página mostra a imagem src', () => {
    const { getByRole } = render(<NotFound />);

    const showImg = getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i });
    expect(showImg).toBeDefined();
    expect(showImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
