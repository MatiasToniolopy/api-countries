import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getCountriesDetails, updateCountries} from "../../redux/actions/actions";
import './Update.css';


export default function Update(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const countryDetail = useSelector((state) => state.countryDetail);
    let navigate = useNavigate();
    const isLoading = useSelector((state) => state.isLoading);
    const [name, setName] = useState('');
    const [population, setPopulation] = useState('');


    useEffect(() => {
        dispatch(getCountriesDetails(id));
    } , [dispatch, id]);

    const handleUpdate = () => {
        dispatch(updateCountries(id, name, population));
        navigate("/home");
        alert("Country updated successfully ✅✅");
    }
    useEffect(() => {
        console.log('isLoading -> ', isLoading);
    } , [isLoading])
    
    useEffect(() => {
        setName(countryDetail.name);
        setPopulation(countryDetail.population);
    } , [countryDetail])

    const handleHome = () => {
        navigate("/home");
    }

    return (
        <div className="contenedor-f">
            <form className="formulario">
                <div className="form-group">
                    <label htmlFor="name" className="nombre">Name</label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="population" className="nombre">Population</label>
                    <input type="text" className="form-control" id="population" value={population} onChange={(e) => setPopulation(e.target.value)} />
                </div>
                <button type="submit" className="upd" onClick={handleUpdate}>Update Country</button>
                <button type="submit" className="back-h" onClick={handleHome}>Back to Home</button>
            </form>
        </div>
    )
          

}