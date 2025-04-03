import React from 'react'
import './FilterControls.css'

const FilterControls = ({ 
  regionFilter, 
  setRegionFilter, 
  casesFilter, 
  setCasesFilter 
}) => {
  // List of continents for the region filter
  const continents = [
    'All',
    'Asia',
    'Europe',
    'Africa',
    'North America',
    'South America',
    'Australia/Oceania'
  ]

  // Case thresholds for filtering
  const caseThresholds = [
    { value: 0, label: 'All' },
    { value: 10000, label: '10,000+' },
    { value: 100000, label: '100,000+' },
    { value: 1000000, label: '1,000,000+' },
    { value: 10000000, label: '10,000,000+' }
  ]

  return (
    <div className="filter-controls">
      {/* Region filter dropdown */}
      <div className="filter-group">
        <label htmlFor="region-filter">Filter by Region:</label>
        <select
          id="region-filter"
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          {continents.map(continent => (
            <option key={continent} value={continent}>
              {continent}
            </option>
          ))}
        </select>
      </div>

      {/* Cases filter dropdown */}
      <div className="filter-group">
        <label htmlFor="cases-filter">Filter by Cases:</label>
        <select
          id="cases-filter"
          value={casesFilter}
          onChange={(e) => setCasesFilter(Number(e.target.value))}
        >
          {caseThresholds.map(threshold => (
            <option key={threshold.value} value={threshold.value}>
              {threshold.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default FilterControls