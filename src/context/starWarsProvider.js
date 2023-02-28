import React, { useEffect, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import starWarsContext from './starWarsContext';
import fetchAPI from '../services/fetchAPI';

function Provider({ children }) {
  const [stateAPI, setStateAPI] = useState([]);
  const [searchedArray, setsearchedArray] = useState([]);
  let planetsToShow = useMemo(() => ([]), []);
  const [filterByFilters, setFilterByFilters] = useState([]);

  const resultsFetchAPI = async () => {
    const returnAPI = await fetchAPI();
    setStateAPI(returnAPI);
  };

  useEffect(() => {
    resultsFetchAPI();
  }, []);

  // useEffect(() => {
  if (searchedArray.length === 0) {
    planetsToShow = stateAPI;
  } else {
    planetsToShow = searchedArray;
  }
  // }, [planetsToShow]);

  console.log(planetsToShow);

  const contextValue = useMemo(() => ({
    stateAPI,
    planetsToShow,
    searchedArray,
    filterByFilters,
    setsearchedArray,
    setFilterByFilters,
  }), [stateAPI, planetsToShow, filterByFilters, searchedArray]);

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
