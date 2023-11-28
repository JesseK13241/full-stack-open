import { useState, useEffect } from 'react'
import countryService from './services/countryService'

import CountryDetails from './components/CountryDetails'
import CountryNames from './components/CountryNames'

function App() {
  const [searchText, setSearchText] = useState("")
  const [allCountries, setAllCountries] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    countryService.getAllCountries()
    .then(data => {
      setAllCountries(data)
      console.log(data)
    })
  }, [])

  const handleSearchText = (event) => {
    const searchText = event.target.value
    setSearchText(searchText)
    setSearchResults(countryService.findCountries(searchText, allCountries))
  }

  return (
    <div>
      find countries
      <input value={searchText} onChange={handleSearchText}/>
      <div> 
        {searchResults.length > 10 ? "Too many matches, specify another filter" : 
         searchResults.length > 1 ? <CountryNames countries={searchResults} /> : 
         searchResults.length == 1 ? <CountryDetails country={searchResults[0]} /> :
         null}
      </div>
    </div>
  )
}

export default App
