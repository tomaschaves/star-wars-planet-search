import React, { useContext, useState } from 'react';
import starWarsContext from '../context/starWarsContext';

const arrayColumns = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

export default function Filters() {
  const contextPlanets = useContext(starWarsContext);
  const { stateAPI,
    setsearchedArray,
    filterByFilters,
    setFilterByFilters,
  } = contextPlanets;

  const [selected, setSelected] = useState({
    column: 'population',
    condition: 'maior que',
    value: '0',
  });

  const [filterValues, setFilterValues] = useState(arrayColumns);

  // const filteredOptions = () => filterValues
  //   .filter((element) => filterByFilters
  //     .forEach((selectedFilter) => selectedFilter.column === element));

  return (
    <div>
      <textarea
        onChange={ ({ target: { value } }) => setsearchedArray(stateAPI
          .filter((planet) => planet.name.toLowerCase().includes(value))) }
        data-testid="name-filter"
      />
      <div>
        <select
          value={ selected.column }
          onChange={ (e) => setSelected({ ...selected, column: e.target.value }) }
          data-testid="column-filter"
        >
          {
            filterValues.map((value) => (
              <option value={ value } key={ value }>{ value }</option>
            ))
          }
        </select>
        <select
          data-testid="comparison-filter"
          value={ selected.condition }
          onChange={ (e) => setSelected({ ...selected, condition: e.target.value }) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="text"
          value={ selected.value }
          onChange={ (e) => setSelected({ ...selected, value: e.target.value }) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => {
            setFilterByFilters([...filterByFilters, selected]);
            const actualArray = filterValues.filter((value) => value !== selected.column);
            setFilterValues(actualArray);
            setSelected({ ...selected, column: actualArray[0] });
          } }
        >
          Adicionar Filtro
        </button>
      </div>
    </div>
  );
}
