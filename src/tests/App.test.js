import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const getElements = () => {
  const textAreaFilter = screen.getByTestId('name-filter');
  const columnFilter = screen.getByTestId('column-filter');
  const comparisonFilter = screen.getByTestId('comparison-filter');
  const valueFilter = screen.getByTestId('value-filter');
  const buttonFilter = screen.getByTestId('button-filter');

  return {
    textAreaFilter, columnFilter, comparisonFilter, valueFilter, buttonFilter,
  }
}

const waitingTime = (milliseconds) => {
  return new Promise(resolve => {
      setTimeout(resolve, milliseconds);
  });
}


describe('Testa a página', () => {
  it('Verifica se os botões do formulário existem', () => {
    render(<App />);
    const { textAreaFilter, columnFilter, comparisonFilter, valueFilter, buttonFilter } = getElements();
    

    expect(textAreaFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(buttonFilter).toBeInTheDocument();
  });

  it('Verifica se o cabeçalho da tabela está populado pelos dados', () => {
    render(<App/>);
     const name = screen.getByText(/Name/i);
     const rotationPeriod = screen.getByText(/Rotation Period/i);
     const orbitalPeriod = screen.getByText(/Orbital Period/i);
     const diameter = screen.getByRole('columnheader', { name: /Diameter/i })
     const climate = screen.getByText(/Climate/i);
     const gravity = screen.getByText(/Gravity/i);
     const terrain = screen.getByText(/Terrain/i);
     const surfaceWater = screen.getByText(/Surface Water/i);
     const population = screen.getByRole('columnheader', { name: /population/i })

     expect(name).toBeInTheDocument();
     expect(rotationPeriod).toBeInTheDocument();
     expect(orbitalPeriod).toBeInTheDocument();
     expect(diameter).toBeInTheDocument();
     expect(climate).toBeInTheDocument();
     expect(climate).toBeInTheDocument();
     expect(gravity).toBeInTheDocument();
     expect(terrain).toBeInTheDocument();
     expect(surfaceWater).toBeInTheDocument();
     expect(population).toBeInTheDocument();
  })

  it('Verifica se a tabela está populada pelos dados', async () => {
    render(<App/>);
    await waitingTime(4000);

    const allRows = screen.queryAllByRole('row');
    expect(allRows.length).toBe(11);

    const tatooine = screen.queryByRole('cell', { name: /Tatooine/i })
    const nabooPopulation = screen.queryByRole('cell', { name: /4500000000/i })
    expect(tatooine).toBeInTheDocument();
    expect(nabooPopulation).toBeInTheDocument();
  })

  it('Verifica se a tabela está populada pelos dados e filtra pelo texto', async () => {
    render(<App/>);
    await waitingTime(4000);

    const { textAreaFilter, columnFilter, comparisonFilter, valueFilter, buttonFilter } = getElements();

    const allRows = screen.queryAllByRole('row');
    expect(allRows.length).toBe(11);

    userEvent.type(textAreaFilter, 'b');
    const filteredByTextRows = screen.queryAllByRole('row');
    expect(filteredByTextRows.length).toBe(4);
    
    userEvent.clear(textAreaFilter);
    const rowsAfterFilterReset = screen.queryAllByRole('row');
    expect(rowsAfterFilterReset).toHaveLength(11);
  })

  it(`Verifica se a tabela filtra pelo 'maior que'`, async () => {
    render(<App/>);
    await waitingTime(4000);

    const { columnFilter, comparisonFilter, valueFilter, buttonFilter } = getElements();

    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '7');
    userEvent.click(buttonFilter);
    const filteredByTextAndFiltersRows = screen.queryAllByRole('row');
    expect(filteredByTextAndFiltersRows).toHaveLength(8);

    const filterDeleteButton = screen.getByTestId('button-remove-filters');
    userEvent.click(filterDeleteButton);

    const rowsAfterButtonReset = screen.queryAllByRole('row');
    expect(rowsAfterButtonReset).toHaveLength(11);
  })


  it(`Verifica se a tabela filtra pelo 'menor que'`, async () => {
    render(<App/>);
    await waitingTime(4000);

    const { columnFilter, comparisonFilter, valueFilter, buttonFilter } = getElements();

    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '7');
    userEvent.click(buttonFilter);
    const filteredByTextAndFiltersRows = screen.queryAllByRole('row');
    expect(filteredByTextAndFiltersRows).toHaveLength(3);

    const filterDeleteButton = screen.getByTestId('button-remove-filters');
    userEvent.click(filterDeleteButton);

    const rowsAfterButtonReset = screen.queryAllByRole('row');
    expect(rowsAfterButtonReset).toHaveLength(11);
  })

  it(`Verifica se a tabela filtra pelo 'igual a'`, async () => {
    render(<App/>);
    await waitingTime(4000);

    const { columnFilter, comparisonFilter, valueFilter, buttonFilter } = getElements();

    userEvent.selectOptions(columnFilter, 'surface_water');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '8');
    userEvent.click(buttonFilter);
    const filteredByTextAndFiltersRows = screen.queryAllByRole('row');
    expect(filteredByTextAndFiltersRows).toHaveLength(4);

    const filterDeleteButton = screen.getByTestId('button-remove-filters');
    userEvent.click(filterDeleteButton);

    const rowsAfterButtonReset = screen.queryAllByRole('row');
    expect(rowsAfterButtonReset).toHaveLength(11);
  })


});
