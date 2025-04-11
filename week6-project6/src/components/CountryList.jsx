import React from 'react'
import { Link } from 'react-router-dom'
import './CountryList.css'

const CountryList = ({ countries }) => {
  return (
    <div className="country-list">
      <h2>Countries Data ({countries.length})</h2>
      
      {countries.length === 0 ? (
        <div className="no-results">No countries match your search criteria</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Country</th>
              <th>Continent</th>
              <th>Total Cases</th>
              <th>Total Deaths</th>
              <th>Active Cases</th>
              <th>Cases/Million</th>
              <th>Deaths/Million</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {countries.map(country => (
              <tr key={country.country}>
                <td>
                  <div className="country-name">
                    <img 
                      src={country.countryInfo.flag} 
                      alt={`${country.country} flag`} 
                      className="country-flag" 
                    />
                    {country.country}
                  </div>
                </td>
                <td>{country.continent}</td>
                <td>{country.cases.toLocaleString()}</td>
                <td>{country.deaths.toLocaleString()}</td>
                <td>{country.active.toLocaleString()}</td>
                <td>{country.casesPerOneMillion.toLocaleString()}</td>
                <td>{country.deathsPerOneMillion.toLocaleString()}</td>
                <td>
                  <Link to={`/country/${country.country}`} className="view-details-btn">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CountryList