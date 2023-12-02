const CountryDetails = ({country, showFn}) => {
    const flagStyle = {
        fontSize: 180
    }
    return (<>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h4>languages:</h4>
        <ul>
            {Object.values(country.languages).map((lang) => (
                <li key={lang}>{lang}</li>
            ))}
        </ul>
        <div style={flagStyle}>{country.flag}</div>
        <h3>Weather in {country.capital}</h3>
        <p>temperature X</p>
        <p>icon</p>
        <p>wind Y</p>

    </>)
}

export default CountryDetails