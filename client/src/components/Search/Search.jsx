import { useDispatch } from 'react-redux';
import { getCountriesNames } from '../../redux/actions/actions';
import React, { useState } from 'react';
import './Search.css';

export default function SearchBar() {

    const dispatch = useDispatch();
    const [name, setName] = useState(''); 

    function handleChange(e){
        e.preventDefault();
        setName(e.target.value);
    };

    function handleEnter(e){
        if(e.key === 'Enter'){
            dispatch(getCountriesNames(name));
            setName('');
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        if(name.length > 2){
            dispatch(getCountriesNames(name));
            setName('');
        } else {
            alert('Please enter a valid country name ❌');
        }
    }

    return (
        <div className='search-container'>
            <div className='wrap'>
            <input
                className='input-search' 
                onChange={e => handleChange(e)}
                placeholder='Search Country...' 
                type='text'
                value={name}
                onKeyDown={handleEnter}
            />
            <button
                className='btn-search'
                type='submit'
                onClick={e => handleSubmit(e)}
            >
                Go
            </button>
                
            </div>
        </div>
    )
};
