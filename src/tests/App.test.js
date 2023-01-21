import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  it('O primeiro link deve possuir o texto Home', () => {
    renderWithRouter(<App />);

    const textHome = screen.getByRole('link', { name: /home/i });
    expect(textHome).toBeDefined();
  });

  it('O segundo link deve possuir o texto About', () => {
    renderWithRouter(<App />);

    const textAbout = screen.getByRole('link', { name: /about/i });
    expect(textAbout).toBeDefined();
  });

  it('O terceiro link deve possuir o texto Favorite Pokémon', () => {
    renderWithRouter(<App />);

    const textFavorite = screen.getByRole('link', {
      name: /favorite pokémon/i });
    expect(textFavorite).toBeInTheDocument();
  });
});
