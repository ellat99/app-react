import React, { useState } from 'react'; // elimină useEffect
import './Header.scss';
import { BsSearch } from 'react-icons/bs';
import { useMealContext } from '../../context/mealContext';
import { useNavigate } from 'react-router-dom';
import { startFetchMealsBySearch } from '../../actions/mealsActions';

const SearchForm = () => {
  const navigate = useNavigate(); //pentru a naviga intre pagini
  const [searchTerm, setSearchTerm] = useState(''); //stocheaza termenul de cautare introdus
  const [errorMsg, setErrorMsg] = useState(''); //mesaj de eroare
  const { dispatch } = useMealContext(); // elimină meals dacă nu este folosit

  const handleSearchTerm = e => {
    e.preventDefault();
    if (e.target.value.replace(/[^\w\s]/gi, '').length !== 0) {
      setSearchTerm(e.target.value); //actualizeaza termenul de cautare
      setErrorMsg(''); //reseteazaa mesajul de eroare
    } else {
      setErrorMsg('Invalid search term ...');
    }
  };

  const handleSearchResult = e => {
    e.preventDefault(); //previne comp implicit al formularului
    navigate('/');
    startFetchMealsBySearch(dispatch, searchTerm); //Apelează funcția de căutare
  };

  return (
    <form
      className="search-form flex align-center"
      onSubmit={e => handleSearchResult(e)}
    >
      <input
        type="text"
        className="form-control-input text-dark-gray fs-15"
        placeholder="Search recipes here ..."
        onChange={e => handleSearchTerm(e)} //ne arata mancarea pe care am scris-o
      />
      <button
        type="submit"
        className="form-submit-btn text-white text-uppercase fs-14"
      >
        <BsSearch className="btn-icon" size={20} />
      </button>
      {errorMsg && <p className="error-message">{errorMsg}</p>}{' '}
      {/* Afișează eroarea */}
    </form>
  );
};

export default SearchForm;
