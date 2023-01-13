import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getActivities, deleteActivities } from "../../redux/actions/actions";
import load from "../images/gifcountri.gif";
import "./GetAct.css";

export default function GetActivities() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const activities = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteActivities(id));
    navigate("/home");
    alert("Activity deleted ❌❌");
  };

  if (!activities.length) {
    return (
      <div className="no-activities">
        <div className="no-cont">
          <h1 className="pri-text">No activities at the moment</h1>
          <img src={load} alt="loading" />
          <button className="boton-back" onClick={() => navigate("/home")}>
            Back to home
          </button>
          <button className="boton-back" onClick={() => navigate("/create")}>
            Create Activity
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="activities">
      {activities.map((activity) => (
        <div className="activities-cont">
          <h1 className="act-title">Activity</h1>
          <ul className="lista-orden">
            <li className="li-items" key={activity.id}>
              <h2>Name: {activity.name}</h2>
              <h3>Duration: {activity.duration}</h3>
              <h4>Difficulty: {activity.difficulty}</h4>
              <p>Season: {activity.season}</p>
              <button
                className="act-del"
                onClick={() => handleDelete(activity.id)}
              >
                Delete Activity
              </button>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
