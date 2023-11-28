import axios from "axios"
const allUrl = "https://studies.cs.helsinki.fi/restcountries/api/all"

const getAllCountries = () => {
    const request = axios.get(allUrl)
    return request.then(response => response.data)
}

const findCountries = (searchText, allCountries) => {
    console.log("Searching by", searchText)
    return allCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
    )
}

export default { findCountries, getAllCountries }