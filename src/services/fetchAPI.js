const fetchAPI = async () => {
  const fetchSWAPI = await fetch('https://swapi.dev/api/planets');
  const data = await fetchSWAPI.json();
  Object.entries(data.results).forEach((planet) => delete planet[1].residents);
  console.log('fetchAPI:', data.results);
  return data.results;
};

export default fetchAPI;
