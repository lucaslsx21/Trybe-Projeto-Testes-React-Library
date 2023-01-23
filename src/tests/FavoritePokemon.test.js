import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemon } from '../pages';
import App from '../App';

describe('Teste o componente FavoritePokemon.js', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemon />);

    const displayedImg = screen.getByText(/No favorite Pokémon found/i);
    expect(displayedImg).toBeDefined();
  });

  it('Teste se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const checkedLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(checkedLink);

    const checkedFavorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(checkedFavorite);

    const favoritePokemon = screen.getByRole('link', {
      name: /Favorite Pokémon/i });
    userEvent.click(favoritePokemon);

    const checkPokemon = screen.getByText(/Pikachu/i);
    expect(checkPokemon).toBeDefined();
  });
});
