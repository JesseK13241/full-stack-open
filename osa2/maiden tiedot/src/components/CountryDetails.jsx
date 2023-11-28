const CountryDetails = ({country}) => {
    const flagStyle = {
        fontSize: 180
    }
    return (<>
        <h2>{country.name.common}</h2>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h3>languages:</h3>
        <ul>
            {Object.values(country.languages).map((lang) => (
                <li key={lang}>{lang}</li>
            ))}
        </ul>
        <div style={flagStyle}>{country.flag}</div>
    </>)
}

export default CountryDetails