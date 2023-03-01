import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

export default function Table() {
  const contextPlanets = useContext(starWarsContext);
  const { planetsToShow, filterByFilters, setFilterByFilters } = contextPlanets;

  const filteredPlanetsToShow = () => {
    const filterByConditions = planetsToShow.filter((planet) => {
      const filterPlanet = filterByFilters.map(({ column, condition, value }) => {
        switch (condition) {
        case 'maior que':
          return Number(planet[column]) > Number(value);
        case 'menor que':
          return Number(planet[column]) < Number(value);
        case 'igual a':
          return Number(planet[column]) === Number(value);
        default:
          return true;
        }
      });
      return filterPlanet.every((element) => element);
    });
    return filterByConditions;
  };

  return (
    <div>
      <div>
        {
          filterByFilters.map((filter, index) => (
            <div key={ index } data-testid="filter">
              {filter.column}
              {filter.condition}
              {filter.value}
              <button
                onClick={ () => setFilterByFilters(
                  filterByFilters.filter((element) => element !== filter),
                ) }
              >
                Deletar
              </button>
            </div>
          ))
        }
      </div>
      <button
        onClick={ () => setFilterByFilters([]) }
        data-testid="button-remove-filters"
      >
        Deletar todos
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            filteredPlanetsToShow().map((planet) => (
              <tr key={ planet.name }>
                <td>{ planet.name }</td>
                <td>{ planet.rotation_period }</td>
                <td>{ planet.orbital_period }</td>
                <td>{ planet.diameter }</td>
                <td>{ planet.climate }</td>
                <td>{ planet.gravity }</td>
                <td>{ planet.terrain }</td>
                <td>{ planet.surface_water }</td>
                <td>{ planet.population }</td>
                <td>{ planet.films }</td>
                <td>{ planet.created }</td>
                <td>{ planet.edited }</td>
                <td>{ planet.url }</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
