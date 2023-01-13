import React from 'react';
import {useNavigate} from 'react-router-dom';
import './Landing.css';


export default function LandingPage() {
    const navigate = useNavigate()

    function handleClick (e) {
        e.preventDefault()
        navigate('/home')
    }

    return (
        <div className='container-lan'>
          <div className='container-lan__title'>
            <h1 className='title-lan'>Welcome to Henry Countries</h1>
            <button className="btnhome" onClick={e => {handleClick(e)}}>Enter Home</button>
          </div>
        </div>
    )
}
