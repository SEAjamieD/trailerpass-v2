import React from 'react';
import './stars.css';

const StarOutline = () => {

    return (
      <div>
        <svg width="20" height="20" viewBox="-50 -50 100 100" xmlns="http://www.w3.org/2000/svg">
        <path className="star-outline star"  d="
        M 0.000 15.000
        L 23.511 32.361
        L 14.266 4.635
        L 38.042 -12.361
        L 8.817 -12.135
        L 0.000 -40.000
        L -8.817 -12.135
        L -38.042 -12.361
        L -14.266 4.635
        L -23.511 32.361
        L 0.000 15.000
        "/>
            </svg>
      </div>
    );
}

export default StarOutline;
