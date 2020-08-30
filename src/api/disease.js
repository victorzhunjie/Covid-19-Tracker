
  export const getCountriesData = async () => {
    const response = await fetch("https://disease.sh/v3/covid-19/countries");
    return response.json();
  }