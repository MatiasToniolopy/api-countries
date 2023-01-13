import React from "react";
import { useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import "./Nav.css";

export default function Nav() {
  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate("/create");
  }

  return (
    <div className="nav-container">
      <div className="navBar">
        <button
          className="btn-nav"
          type="submit"
          onClick={(e) => handleClick(e)}
        >
          Create Activity
        </button>
        <h1 className="nav-title">Around The World App</h1>
        <Search />
      </div>
    </div>
  );
}
