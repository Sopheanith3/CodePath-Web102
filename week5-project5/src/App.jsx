import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import SummaryStats from './components/SummaryStats'
import CountryList from './components/CountryList'
import SearchBar from './components/SearchBar'
import FilterControls from './components/FilterControls'

function App() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [globalData, setGlobalData] = useState({})
  const [searchQuery, setSearchQuery] = useState('')
  const [regionFilter, setRegionFilter] = useState('All')
  const [casesFilter, setCasesFilter] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data on component mount
  useEffect(() => {
    const fetchCovidData = async () => {
      try {
        setLoading(true)
        const countriesPromise = fetch(import.meta.env.VITE_API_COUNTRIES_ENDPOINT || 'https://disease.sh/v3/covid-19/countries')
        const globalPromise = fetch(import.meta.env.VITE_API_GLOBAL_ENDPOINT || 'https://disease.sh/v3/covid-19/all')
        
        const [countriesResponse, globalResponse] = await Promise.all([
          countriesPromise,
          globalPromise
        ])
        
        if (!countriesResponse.ok || !globalResponse.ok) {
          throw new Error(`API error: ${countriesResponse.status || globalResponse.status}`)
        }
        
        const [countriesData, globalData] = await Promise.all([
          countriesResponse.json(),
          globalResponse.json()
        ])
        setGlobalData(globalData)
        setCountries(countriesData)
        setFilteredCountries(countriesData)
        setLoading(false)
      } catch (err) {
        setError(`Failed to fetch data: ${err.message}`)
        setLoading(false)
      }
    }

    fetchCovidData()
  }, [])

  // Filter countries based on search query and filters
  useEffect(() => {
    let result = countries
    if (searchQuery) {
      result = result.filter(country => 
        country.country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    if (regionFilter !== 'All') {
      result = result.filter(country => 
        country.continent === regionFilter
      )
    }
    if (casesFilter > 0) {
      result = result.filter(country => 
        country.cases >= casesFilter
      )
    }
    
    setFilteredCountries(result)
  }, [searchQuery, regionFilter, casesFilter, countries])

  // Get summary statistics directly from global data
  const getTotalCases = () => {
    return globalData.cases || 0
  }
  
  const getTotalDeaths = () => {
    return globalData.deaths || 0
  }
  
  const getTotalRecovered = () => {
    return globalData.recovered || 0
  }
  
  const getActiveCases = () => {
    return globalData.active || 0
  }
  
  const getCriticalCases = () => {
    return globalData.critical || 0
  }
  
  const getAffectedCountries = () => {
    return globalData.affectedCountries || 0
  }
  
  const getMostAffectedCountry = () => {
    if (countries.length === 0) return 'N/A'
    return countries.reduce((prev, current) => 
      prev.cases > current.cases ? prev : current
    ).country
  }

  return (
    <div className="app">
      <Header />
      
      {loading ? (
        <div className="loading">Loading data...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <SummaryStats 
            totalCases={getTotalCases()}
            totalDeaths={getTotalDeaths()}
            totalRecovered={getTotalRecovered()}
            activeCases={getActiveCases()}
            criticalCases={getCriticalCases()}
            affectedCountries={getAffectedCountries()}
            mostAffectedCountry={getMostAffectedCountry()}
          />
          
          <div className="controls">
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
            />
            
            <FilterControls 
              regionFilter={regionFilter}
              setRegionFilter={setRegionFilter}
              casesFilter={casesFilter}
              setCasesFilter={setCasesFilter}
            />
          </div>
          
          <CountryList countries={filteredCountries} />
        </>
      )}
    </div>
  )
}

export default App