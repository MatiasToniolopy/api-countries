import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllCountries, {
  getActivities,
  orderByActivities,
  orderByAlpha,
  orderByContinent,
  orderByPopulation,
} from "../../redux/actions/actions";
import "./Filters.css";

export default function Filters({ setOrder }) {
  const dispatch = useDispatch();
  const allActivities = useSelector((state) => state.activities);

  const chargeCountries = () => {
    let selectList = document.querySelectorAll(".default-select");
    selectList.forEach((select) => (select.value = "DEFAULT"));

    dispatch(getAllCountries());
  };

  const handleContinent = (e) => {
    e.preventDefault();
    dispatch(orderByContinent(e.target.value));
  };

  const handleAlpha = (e) => {
    e.preventDefault();
    dispatch(orderByAlpha(e.target.value));
    setOrder(`Order ${e.target.value}`);
  };

  const handlePopulation = (e) => {
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value));
    setOrder(`Order ${e.target.value}`);
  };

  const handleActivities = (e) => {
    e.preventDefault();
    dispatch(orderByActivities(e.target.value));
  };

  useEffect(() => {
    setOrder("Ordered");
  }, [handleAlpha, handlePopulation]);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  return (
    <div className="container">
      <select
        className="default-select"
        onChange={(e) => {
          handleActivities(e);
        }}
      >
        <option value="DEFAULT">All Activities</option>
        {allActivities.map((e) => {
          return (
            <option value={e.name} key={e.id}>
              {e.name}
            </option>
          );
        })}
      </select>

      <select
        id="select-continents"
        className="default-select"
        defaultValue={"DEFAULT"}
        onChange={(e) => {
          handleContinent(e);
        }}
      >
        <option value="DEFAULT">All Continents</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Africa">Africa</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Oceania">Oceania</option>
      </select>

      <select
        className="default-select"
        defaultValue={"DEFAULT"}
        onChange={(e) => {
          handleAlpha(e);
        }}
      >
        <option value="DEFAULT">Alphabetic</option>
        <option value="Asc">A-Z</option>
        <option value="Desc">Z-A</option>
      </select>

      <select
        className="default-select"
        defaultValue={"DEFAULT"}
        onChange={(e) => {
          handlePopulation(e);
        }}
      >
        <option value="DEFAULT">Population</option>
        <option value="AscPop">Ascending Population</option>
        <option value="DescPop">Descending Population</option>
      </select>

      <button className="btn-AllCountries" onClick={(e) => chargeCountries(e)}>
        All Countries
      </button>
    </div>
  );
}
