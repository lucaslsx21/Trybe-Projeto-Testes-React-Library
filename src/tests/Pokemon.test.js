import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon, imagem do pokemon e o tipo do pokemon', () => {
    renderWithRouter(<App />);

    const renderPokemon = screen.getByText(/Pikachu/i);
    expect(renderPokemon).toBeDefined();

    const tipPokemon = screen.getByTestId('pokemon-type');
    expect(tipPokemon).toBeDefined();

    const weight = screen.getByText(/Average weight: 6.0 kg/i);
    expect(weight).toBeDefined();

    const img = screen.getByAltText(/Pikachu sprite/i);
    expect(img).toBeDefined();

    expect(img.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');

    expect(tipPokemon.innerHTML).toBe('Electric');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação, se é feito o renderizamento, mudança da URL', () => {
    renderWithRouter(<App />);

    const navigationLink = screen.getByRole('link', {
      name: /More details/i });
    expect(navigationLink).toBeDefined();
    expect(navigationLink.href).toBe('http://localhost/pokemon/25');
    userEvent.click(navigationLink);

    const heading = screen.getByRole('heading', { name: /Pikachu Details/i });
    expect(heading).toBeDefined();

    const { pathname } = window.location;
    expect(pathname).toBe('/');
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const checkLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(checkLink);

    const favoritePokemon = screen.getByText(/Pokémon favoritado?/i);
    userEvent.click(favoritePokemon);

    const starPokemon = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(starPokemon).toBeDefined();
    expect(starPokemon.src).toBe('http://localhost/star-icon.svg');
  });
});
