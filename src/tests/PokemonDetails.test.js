import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente PokemonDetails.js', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<App />);

    const selectionPokemon = screen.getByRole('link', { name: /More details/i });
    userEvent.click(selectionPokemon);

    const headingPokemon = screen.getByRole('heading', { name: /Pikachu details/i });
    expect(headingPokemon).toBeDefined();

    const textHeading = screen.getByRole('heading', { name: /Summary/i });
    expect(textHeading).toBeDefined();

    const paragraphPokemon = screen.getByText(/This intelligent Pokémon/i);
    expect(paragraphPokemon).toBeDefined();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const checkLink = screen.getByRole('link', { name: /More details/i });
    userEvent.click(checkLink);

    const pageLocation = screen.getByRole('heading', {
      name: /Game Locations of Pikachu/i });
    expect(pageLocation).toBeDefined();

    const allDetails = screen.getByText(/Kanto Viridian Forest/i);
    expect(allDetails).toBeDefined();

    const locationPokemon = screen.getAllByAltText(/Pikachu location/i);

    const imgPokemon = locationPokemon.map((element) => element.src);
    expect(imgPokemon).toEqual([
      'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
      'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    ]);
  });

  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const chekList = screen.getByRole('link', { name: /More Details/i });
    userEvent.click(chekList);

    const favoriteCheckBox = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(favoriteCheckBox);
    expect(favoriteCheckBox).toBeDefined();

    const clickAddRemov1 = screen.getByAltText(/Pikachu is marked as favorite/i);
    expect(clickAddRemov1);
    userEvent.click(favoriteCheckBox);

    const clickAddRemov2 = screen.queryByAltText(/Pikachu is marked as favorite/i);
    expect(clickAddRemov2).not.toBeInTheDocument();
  });
});
