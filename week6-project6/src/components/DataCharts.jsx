import React, { useState } from 'react'
import { 
  BarChart, Bar, PieChart, Pie, Cell, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, LineChart, Line
} from 'recharts'
import './DataCharts.css'

const DataCharts = ({ countries }) => {
  const [showCharts, setShowCharts] = useState(true)
  
  // Exit early if no countries data
  if (!countries || countries.length === 0) {
    return null
  }
  
  // Prepare data for Top 10 Countries by Cases chart
  const topCountriesByCase = [...countries]
    .sort((a, b) => b.cases - a.cases)
    .slice(0, 10)
    .map(country => ({
      name: country.country,
      cases: country.cases,
      deaths: country.deaths,
      recovered: country.recovered
    }))
  
  // Prepare data for Cases by Continent chart
  const continentData = countries.reduce((acc, country) => {
    if (!country.continent) return acc
    
    const continent = country.continent
    if (!acc[continent]) {
      acc[continent] = {
        name: continent,
        cases: 0,
        deaths: 0,
        recovered: 0,
        countries: 0
      }
    }
    
    acc[continent].cases += country.cases
    acc[continent].deaths += country.deaths
    acc[continent].recovered += country.recovered || 0
    acc[continent].countries += 1
    
    return acc
  }, {})
  
  const continentsArray = Object.values(continentData).sort((a, b) => b.cases - a.cases)
  
  // Prepare data for Cases per Million by Continent chart
  const casesPerMillionByContinent = Object.values(continentData).map(c => {
    // Get all countries in this continent
    const continentCountries = countries.filter(country => country.continent === c.name)
    
    // Calculate total population
    const totalPopulation = continentCountries.reduce((sum, country) => sum + country.population, 0)
    
    // Calculate cases per million
    const casesPerMillion = totalPopulation > 0 
      ? (c.cases / totalPopulation) * 1000000 
      : 0
      
    return {
      name: c.name,
      casesPerMillion: Math.round(casesPerMillion)
    }
  }).sort((a, b) => b.casesPerMillion - a.casesPerMillion)
  
  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D']
  
  return (
    <div className="data-charts">
      <div className="charts-header">
        <h2>COVID-19 Data Visualizations</h2>
        <button 
          className="toggle-charts-btn"
          onClick={() => setShowCharts(!showCharts)}
        >
          {showCharts ? 'Hide Charts' : 'Show Charts'}
        </button>
      </div>
      
      {showCharts && (
        <div className="charts-container">
          <div className="chart-card">
            <h3>Top 10 Countries by Total Cases</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={topCountriesByCase}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => new Intl.NumberFormat().format(value)}
                  />
                  <Legend />
                  <Bar dataKey="cases" fill="#3498db" name="Total Cases" />
                  <Bar dataKey="deaths" fill="#e74c3c" name="Total Deaths" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="chart-card">
            <h3>COVID-19 Cases by Continent</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={continentsArray}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="cases"
                    nameKey="name"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                  >
                    {continentsArray.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => new Intl.NumberFormat().format(value)}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="chart-card">
            <h3>Cases per Million by Continent</h3>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={casesPerMillionByContinent}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 60,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end"
                    height={70}
                  />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => new Intl.NumberFormat().format(value)}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="casesPerMillion"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Cases per Million"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataCharts