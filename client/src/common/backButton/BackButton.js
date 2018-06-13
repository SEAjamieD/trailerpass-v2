import React from 'react';
import { Link } from 'react-router-dom';
import './backbutton.css';

const Backbutton = () => {
  return (
      <div className="backbutton__container full-flex">
        <Link to="/">
          <div className="arrow left-arrow"></div>
        </Link>
      </div>
  );
}

export default Backbutton;
