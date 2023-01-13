import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getCountriesDetails, deleteCountries, getActivities } from "../../redux/actions/actions";
import Activity from "../Activity/Activity";
import './CountriDetail.css';

export default function CountryDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const countryDetail = useSelector((state) => state.countryDetail);
  let navigate = useNavigate();
  const isLoading = useSelector((state) => state.isLoading);


  useEffect(() => {
    dispatch(getActivities());
} , [dispatch]);

  const handleAct = () => {
    navigate("/activities");
  }

  useEffect(() => {
    dispatch(getCountriesDetails(id));
  }, [dispatch, id]);

  const handleDelete = () => {
    dispatch(deleteCountries(id));
    navigate("/home");
    alert("Country deleted ❌❌");
  }

  const handleEdit = () => {
    navigate(`/update/${id}`);
  }

  function handleClick(e) {
    e.preventDefault();
    navigate("/home");
  }

  useEffect(() => {
    console.log('isLoading -> ', isLoading);
  }, [isLoading])

  return (
    <div className="container-detail">
      <div className="cardDetail">
        <div>
          <div>
            <h1 className="titleName">{countryDetail.name}</h1>
            <h3 className="countryId">ID: {countryDetail.id}</h3>
            <img
              className="flag"
              src={countryDetail.flags}
              alt={`flag from ${countryDetail.name}`}
            />
          </div>
        </div>

        <div className="text">
          <h4 className="h4Tag">
            <em>・Continent・</em>
            {countryDetail.continents}
          </h4>
          <h4 className="h4Tag">
            <em>・Capital・</em>
            {countryDetail.capital}
          </h4>
          <h4 className="h4Tag">
            <em>・Subregion・</em>
            {countryDetail.subregion}
          </h4>
          <h4 className="h4Tag">
            {" "}
            <em>・Area・ </em>
            {countryDetail.area}km²
          </h4>
          <h4 className="h4Tag">
            <em>・Population・ </em>
            {countryDetail.population}
          </h4>
        </div>

        <div className="titleName2">
          <h2>Activities</h2>
        </div>

        <div className="containerAct">
          {countryDetail.activities && countryDetail.activities.length > 0 ? (
            countryDetail.activities.map((e) => {
              return (
                <Activity
                  key={e.id}
                  name={e.name}
                  difficulty={e.difficulty}
                  duration={e.duration}
                  season={e.season}
                />
              );
            })
          ) : (
            <p className="no-activity">No activities at the moment</p>
          )}
        </div>
      </div>

      <div>
        <button
          className="btn-back"
          type="submit"
          onClick={(e) => handleClick(e)}
        >
          Back to Home
        </button>{" "}
        <button
          className="btn-del"
          type="submit"
          onClick={(e) => handleDelete(e)}
        >
          Delete Country
        </button>{" "}
        <button
          className="btn-edit"
          type="submit"
          onClick={(e) => handleEdit(e)}
        >
          Update Country
        </button>{" "}

        <button
          className="btn-act"
          type="submit"
          onClick={(e) => handleAct(e)}
        >
          View All Activitis
        </button>{" "}
      </div>
    </div>
  );
}