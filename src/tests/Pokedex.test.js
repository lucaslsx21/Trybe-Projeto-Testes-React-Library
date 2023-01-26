import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente Pokedex', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const textH2 = screen.getByRole('heading', { name: /Encountered Pokémon/i });
    expect(textH2).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const clickButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(clickButton).toBeInTheDocument();

    const pokemonOne = screen.getByText('Pikachu');
    expect(pokemonOne).toBeInTheDocument();
    userEvent.click(clickButton);

    const pokemonTwo = screen.getByText('Charmander');
    expect(pokemonTwo).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const tipos = [
      { name: 'all', regex: /all/i },
      { name: 'electric', regex: /electric/i },
      { name: 'fire', regex: /fire/i },
      { name: 'bug', regex: /bug/i },
      { name: 'poison', regex: /poison/i },
      { name: 'psychic', regex: /psychic/i },
      { name: 'normal', regex: /normal/i },
      { name: 'dragon', regex: /dragon/i },
    ];
    tipos.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type.regex });
      expect(buttonType).toBeInTheDocument();
    });
  });

  it('Os botões de filtragem por tipo possuem o data-testid=pokemon-type-button exceto o botão All', () => {
    const pokemons = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans', 'Alakazam', 'Snorlax', 'Dragonair'];

    renderWithRouter(<App />);
    const buttonsAll = screen.getAllByTestId('pokemon-type-button');
    expect(buttonsAll.length).toBe(7);

    buttonsAll.forEach((button, index) => {
      userEvent.click(button);
      const element = screen.getByText(pokemons[index]);
      expect(element).toBeInTheDocument();
    });
    const checkAllButton = screen.getByRole('button', { name: /All/i });
    userEvent.click(checkAllButton);

    const chekupPokemon = screen.getByText(pokemons[0]);
    expect(chekupPokemon).toBeInTheDocument();
  });
});
