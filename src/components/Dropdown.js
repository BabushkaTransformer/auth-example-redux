import React, {useState} from 'react';
import countries from "../data/countries.json";
import './Dropdown.css';


const Dropdown = ({inputValue, setInputValue}) => {
  const [isOpen, setIsOpen] = useState(false);


  const filterCountries = (countries) => {
    return countries.filter(el => el.name.toLowerCase().trim().includes(inputValue.toLowerCase().trim()))
  }

  return (
    <div className='dropdown'>
      <input value={inputValue}
             onFocus={() => setIsOpen(prev => !prev)}
             onBlur={() => setIsOpen(prev => !prev)}
             onChange={e => setInputValue(e.target.value)}
      />
      <div className={isOpen ? 'options open' : 'options'}>
        {filterCountries(countries).map(option => (
          <div className='option' key={option.name} onMouseDown={() => setInputValue(option.name)}>{option.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;