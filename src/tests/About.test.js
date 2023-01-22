import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../pages';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pageAbout = screen.getByText(/This application simulates a Pokédex/i);
    expect(pageAbout).toBeDefined();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);

    const pageHeading = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(pageHeading).toBeDefined();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const pageParagraphsOne = screen.getByText(/This application simulates a Pokédex/i);
    expect(pageParagraphsOne).toBeDefined();

    const pageParagraphsTwo = screen.getByText(/One can filter Pokémon by type/i);
    expect(pageParagraphsTwo).toBeDefined();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const pageImg = screen.getByRole('img', { name: /pokédex/i });
    expect(pageImg).toBeDefined();
    expect(pageImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
