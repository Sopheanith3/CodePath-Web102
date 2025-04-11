import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import './components/CountryDetail.css'
import SummaryStats from './components/SummaryStats'
import Header from './Header'

const CountryDetail = ({ countries }) => {
    const { countryId } = useParams()
    const [country, setCountry] = useState(null)
    
    useEffect(() => {
      if (countries.length > 0) {
        const selectedCountry = countries.find(c => 
          c.country.toLowerCase() === countryId.toLowerCase())
        
        setCountry(selectedCountry)
      }
    }, [countryId, countries])
    
    if (!country) {
      return <div className="loading">Loading country data...</div>
    }

    // Format numbers with commas
    const formatNumber = (num) => num.toLocaleString()
    
    return (
    <div className="country-detail">
        <Header />
        
        <div className="back-link">
        <Link to="/">&larr; Back to dashboard</Link>
        </div>
        
        <div className="country-header">
        <img 
            src={country.countryInfo.flag} 
            alt={`${country.country} flag`} 
            className="detail-flag" 
        />
        <h1>{country.country}</h1>
        <p className="continent">{country.continent}</p>
        </div>
        
        <div className="detail-stats">
        <div className="stat-card">
            <h3>Total Cases</h3>
            <p className="stat-value">{formatNumber(country.cases)}</p>
        </div>
        
        <div className="stat-card">
            <h3>Total Deaths</h3>
            <p className="stat-value">{formatNumber(country.deaths)}</p>
        </div>
        
        <div className="stat-card">
            <h3>Total Recovered</h3>
            <p className="stat-value">{formatNumber(country.recovered)}</p>
        </div>
        
        <div className="stat-card">
            <h3>Active Cases</h3>
            <p className="stat-value">{formatNumber(country.active)}</p>
        </div>
        </div>
        
        <div className="detail-grid">
        <div className="detail-section">
            <h2>Additional Statistics</h2>
            <table className="detail-table">
            <tbody>
                <tr>
                <td>Critical Cases:</td>
                <td>{formatNumber(country.critical)}</td>
                </tr>
                <tr>
                <td>Tests Conducted:</td>
                <td>{formatNumber(country.tests)}</td>
                </tr>
                <tr>
                <td>Tests per Million:</td>
                <td>{formatNumber(country.testsPerOneMillion)}</td>
                </tr>
                <tr>
                <td>Cases per Million:</td>
                <td>{formatNumber(country.casesPerOneMillion)}</td>
                </tr>
                <tr>
                <td>Deaths per Million:</td>
                <td>{formatNumber(country.deathsPerOneMillion)}</td>
                </tr>
                <tr>
                <td>Population:</td>
                <td>{formatNumber(country.population)}</td>
                </tr>
                <tr>
                <td>One Case per People:</td>
                <td>{formatNumber(country.oneCasePerPeople)}</td>
                </tr>
                <tr>
                <td>One Death per People:</td>
                <td>{formatNumber(country.oneDeathPerPeople)}</td>
                </tr>
                <tr>
                <td>One Test per People:</td>
                <td>{formatNumber(country.oneTestPerPeople)}</td>
                </tr>
            </tbody>
            </table>
        </div>
        
        <div className="detail-section">
            <h2>Location Information</h2>
            <table className="detail-table">
            <tbody>
                <tr>
                <td>Continent:</td>
                <td>{country.continent}</td>
                </tr>
                <tr>
                <td>Country:</td>
                <td>{country.country}</td>
                </tr>
                <tr>
                <td>ISO2 Code:</td>
                <td>{country.countryInfo.iso2 || 'N/A'}</td>
                </tr>
                <tr>
                <td>ISO3 Code:</td>
                <td>{country.countryInfo.iso3 || 'N/A'}</td>
                </tr>
                <tr>
                <td>Latitude:</td>
                <td>{country.countryInfo.lat}</td>
                </tr>
                <tr>
                <td>Longitude:</td>
                <td>{country.countryInfo.long}</td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    </div>
    )
}

export default CountryDetail