import React, { useState } from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

const CountrySelector = () => {
  const [value, setValue] = useState(null);
  const options = countryList().getData();

  const changeHandler = (value) => {
    setValue(value);
  };

  return <Select options={options} value={value} onChange={changeHandler} />;
};

export default CountrySelector;
