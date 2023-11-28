const CountryNames = ({ countries }) => {
    return countries.map((country) => (
      <div key={country.flag}>
        {country.name.common}
      </div>
    ))
}

export default CountryNames