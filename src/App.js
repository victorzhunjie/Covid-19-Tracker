import React, { useState, useEffect } from 'react';
import { sortData } from './utils'
// import { sortData } from './api/disease'
import { InfoBox, Map, Table, LineGraph } from './components';
import "leaflet/dist/leaflet.css";
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";

function App() {
  // state
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: -27, lng: 133 }); // aus
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  // todo rewrite code function
  useEffect(() => {
    const url = 'https://disease.sh/v3/covid-19/all'
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);


  useEffect(() => {
    // the code inside here will run once and when comoponent loads ad not again 
    // asyncs -? send a request 
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country, // australia
              value: country.countryInfo.iso2 // AU
            }
          ));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data); // all data
        })
    }
    getCountriesData();
  }, [countries]);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
        // console.log('------', data.countryInfo.lat, data.countryInfo.long)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4)
      })
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1 className="app__title">COVID 19 Tracker App </h1>
          <FormControl className="app_dropdown">
            <Select variant="outlined" value={country} onChange={onCountryChange}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>{country.name}</MenuItem>
              ))
              }
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title="Covid cases"
            active={casesType === "cases"}
            onClick={(e) => setCasesType("cases")}
            total={countryInfo.cases}
            cases={countryInfo.todayCases} />

          <InfoBox title="Recovered"
            active={casesType === "recovered"}
            onClick={(e) => setCasesType("recovered")}
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered} />

          <InfoBox title="Deaths"
            active={casesType === "deaths"}
            onClick={(e) => setCasesType("deaths")}
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths} />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom} />
      </div>

      <Card className="app__right">
        {/* table */}
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries={tableData} />
        </CardContent>

        <CardContent>
          <h3>World wide new cases</h3>
        </CardContent>
        {/* graph */}
        <LineGraph className="app__graph" casesType={'cases'} />
      </Card>

    </div>
  );
}

export default App;
