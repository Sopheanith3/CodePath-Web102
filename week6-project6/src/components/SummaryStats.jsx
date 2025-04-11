import React from 'react'
import './SummaryStats.css'

const SummaryStats = ({ 
  totalCases, totalDeaths, totalRecovered, activeCases, criticalCases, affectedCountries, mostAffectedCountry 
}) => {
  return (
    <div className="summary-stats">
      <div className="stat-card total-cases">
        <h3>Total Cases</h3>
        <p className="stat-value">{totalCases.toLocaleString()}</p>
      </div>
      
      <div className="stat-card total-deaths">
        <h3>Total Deaths</h3>
        <p className="stat-value">{totalDeaths.toLocaleString()}</p>
      </div>
      
      <div className="stat-card total-recovered">
        <h3>Total Recovered</h3>
        <p className="stat-value">{totalRecovered.toLocaleString()}</p>
      </div>
      
      <div className="stat-card active-cases">
        <h3>Active Cases</h3>
        <p className="stat-value">{activeCases.toLocaleString()}</p>
      </div>
      
      <div className="stat-card critical-cases">
        <h3>Critical Cases</h3>
        <p className="stat-value">{criticalCases.toLocaleString()}</p>
      </div>
      
      <div className="stat-card affected-countries">
        <h3>Affected Countries</h3>
        <p className="stat-value">{affectedCountries.toLocaleString()}</p>
      </div>
      
      <div className="stat-card most-affected">
        <h3>Most Affected Country</h3>
        <p className="stat-value">{mostAffectedCountry}</p>
      </div>
    </div>
  )
}

export default SummaryStats