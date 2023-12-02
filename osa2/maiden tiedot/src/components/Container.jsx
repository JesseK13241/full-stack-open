import CountryDetails from './CountryDetails'
import CountryNames from './CountryNames'

const Container = ({countries, showFn}) => {
    return (
        countries.length > 10 ? "Too many matches, specify another filter" : 
        countries.length > 1 ? <CountryNames countries={countries} showFn={showFn}/> : 
        countries.length == 1 ? <CountryDetails country={countries[0]} /> :
        null
    )
}

export default Container
