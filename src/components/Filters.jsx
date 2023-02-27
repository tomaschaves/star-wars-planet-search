import React, { useContext } from 'react';
import starWarsContext from '../context/starWarsContext';

export default function Filters() {
  const contextPlanets = useContext(starWarsContext);
  const { stateAPI, setSearchText } = contextPlanets;
  const filteredByText = ({ target: { value } }) => {
    setSearchText(stateAPI.filter((planet) => planet.name.toLowerCase().includes(value)));
  };

  return (
    <div>
      <textarea onChange={ filteredByText } data-testid="name-filter" />
    </div>
  );
}
