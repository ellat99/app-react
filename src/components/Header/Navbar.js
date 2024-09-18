import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import { MdFoodBank } from 'react-icons/md';
import { IoMdMenu } from 'react-icons/io';
import { useSidebarContext } from '../../context/sidebarContext';

const Navbar = () => {
  //definirea comp Navbar
  const { openSidebar } = useSidebarContext(); //se extrage din cintextul sidebarului pt a fi utilizat in componenta
  const [scrolled, setScrolled] = useState(false); //stare booleana care indica daca pagina a fost derulata mai mult de 60 de px

  const handleScroll = () => {
    const offset = window.scrollY; //derularea verticala a paginii
    if (offset > 60) {
      setScrolled(true); //utiliz a derulat mai mult de 60px si pot iaplica stilurile /efecte specifice
    } else {
      setScrolled(false); //daca nu depaseste revine la stilurile /efectele intiale
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  });

  return (
    <nav
      className={`navbar bg-orange flex align-center ${
        scrolled ? 'scrolled' : ''
      }`}
      //adăuga sau exclude clase CSS în mod dinamic în funcție de starea componentelor în React.
    >
      <div className="container w-100">
        <div className="navbar-content text-white">
          <div className="brand-and-toggler flex align-center justify-between">
            <Link to="/" className="navbar-brand fw-3 fs-22 flex align-center">
              <MdFoodBank />
              <span className="navbar-brand-text fw-7">Gustă</span>
            </Link>
            <div className="navbar-btns flex align-center">
              <button
                type="button"
                className="navbar-show-btn text-white"
                onClick={() => openSidebar()}
              >
                <IoMdMenu size={25} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
