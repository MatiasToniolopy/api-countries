import React from 'react';
import loading2 from '../images/load.gif';
import './Loading.css';

export function Loading() {

    return (
      <div className='loading-container'>
        <img className="loading-img" src={loading2} alt="Loading ..." />
        <div>
          <p>Loading...</p>
        </div>
      </div>
    );
    
  }