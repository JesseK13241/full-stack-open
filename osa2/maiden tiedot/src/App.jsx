import { useState, useEffect } from 'react'
import countryService from './services/countryService'

import Container from './components/Container'

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
        <Container countries={searchResults} showFn={setSearchResults}></Container>
      </div>
    </div>
  )
}

export default App
