import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import starWarsContext from './starWarsContext';
import fetchAPI from '../services/fetchAPI';

// const INITIAL_STATE = { nome: 'Xablau', idade: 100 };

function Provider({ children }) {
  const [stateAPI, setStateAPI] = useState([]);

  const resultsFetchAPI = async () => {
    const returnAPI = await fetchAPI();
    setStateAPI(returnAPI);
  };

  useEffect(() => {
    resultsFetchAPI();
  }, []);

  return (
    <starWarsContext.Provider value={ stateAPI }>
      {children}
    </starWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: propTypes.string,
}.isRequired;

export default Provider;
