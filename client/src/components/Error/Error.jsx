import React from "react";
import {useNavigate} from 'react-router-dom'
import './Error.css';

export default function Error(){
    const navigate = useNavigate()
    return (
        <div className="not-error">
            <h1 className="title">Error</h1>
            <button className="btn-page-error" onClick={() => navigate('/home')}>Back to Home</button>
        </div>
    )
}