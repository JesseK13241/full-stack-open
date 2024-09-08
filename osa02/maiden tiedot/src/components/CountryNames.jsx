const CountryNames = ({ countries, showFn }) => {
    return countries.map((country) => (
      <div key={country.flag}>
        {country.name.common}
      <button onClick={() => {showFn([country])}}>Show</button>
      </div>
    ))
}

export default CountryNames