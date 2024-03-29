import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from '../../api'

const Search = ({ onSearchChange }) => {

  const [Search, setSearch] = useState(null);

  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude}`,
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (SearchData) => {
    setSearch(SearchData);
    onSearchChange(SearchData);
  }


  return (
    <AsyncPaginate

      placeholder="Search For City"
      debounceTimeout={600}
      value={Search}
      onChange={handleOnChange}
      loadOptions={loadOptions}

    />
  )
}
export default Search;