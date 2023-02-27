import React, { useEffect, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import starWarsContext from './starWarsContext';
import fetchAPI from '../services/fetchAPI';

function Provider({ children }) {
  const [stateAPI, setStateAPI] = useState([]);
  const [searchText, setSearchText] = useState([]);
  let planetsToShow = useMemo(() => ([]), []);

  const resultsFetchAPI = async () => {
    const returnAPI = await fetchAPI();
    setStateAPI(returnAPI);
  };

  useEffect(() => {
    resultsFetchAPI();
  }, []);

  if (searchText.length === 0) {
    planetsToShow = stateAPI;
  } else {
    planetsToShow = searchText;
  }
  console.log(planetsToShow);

  const contextValue = useMemo(() => ({
    stateAPI,
    planetsToShow,
    searchText,
    setSearchText,
  }), [stateAPI, planetsToShow, searchText]);

  return (
    <starWarsContext.Provider value={ contextValue }>
      {children}
    </starWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.string,
}.isRequired;

export default Provider;
