import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getAllCountries from "../../redux/actions/actions";
import CountriesCards from "../CountriCard/CountriCard";
import Filters from "../Filters/Filters";
import { Loading } from "../Loading/Loading";
import Nav from "../Nav/Nav.jsx";
import Pagination from "../Pagination/Pagination";
import "./Home.css";
import notFound from "../images/gifcountri.gif";

export default function Home() {
  const dispatch = useDispatch();
  const allCountries = useSelector((state) => state.countries);
  const stateFirstIndexPage = useSelector((state) => state.firstIndexPage);
  const isLoading = useSelector((state) => state.isLoading);
  const [order, setOrder] = useState("");
  const error = useSelector((state) => state.error);

  //Pagination
  const countriesForFirstPage = 9;
  const countriesForRestOfPages = 10;

  const [indexFirstCountry, setIndexFirstCountry] = useState(0);
  const [indexLastCountry, setIndexLastCountry] = useState(
    countriesForFirstPage
  );

  const [countriesInActualPage, setCountriesInActualPage] = useState([]);

  const pagination = (e) => {
    const pageNumber = e.target.value;

    const initialIndex =
      pageNumber === 1 ? 0 : countriesForRestOfPages * (pageNumber - 1) - 1;
    const finalIndex =
      pageNumber === 1
        ? countriesForFirstPage
        : countriesForRestOfPages * pageNumber - 1;

    setIndexFirstCountry(initialIndex);
    setIndexLastCountry(finalIndex);

    setCountriesInActualPage(allCountries.slice(initialIndex, finalIndex));
  };

  useEffect(() => {
    setCountriesInActualPage(
      allCountries.slice(
        stateFirstIndexPage ?? indexFirstCountry,
        indexLastCountry
      )
    );
  }, [allCountries[0]]);

  useEffect(() => {
    dispatch(getAllCountries());
  }, [dispatch]);

  return (
    <div className="container-home">
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Nav />
          <hr></hr>
          <div className="filtros-home">
            <Filters setOrder={setOrder} />
          </div>
        </div>
      )}

      {allCountries.length === 0 && (
        <div className="not-found-message-container">
          <p className="not-found-message">The entered country was not found</p>
          <img className="img-john" src={notFound} alt="not found" />
          <p className="not-found-message">Retry</p>
        </div>
      )}
      {allCountries.length > 0 && (
        <div>
          <Pagination
            countriesForRestOfPages={countriesForRestOfPages}
            allCountries={allCountries.length}
            pagination={pagination}
            countriesForFirstPage={countriesForFirstPage}
          />
          <div>
            {countriesInActualPage?.length !== 0 ? (
              countriesInActualPage.map((c) => {
                return (
                  <CountriesCards
                    key={c.id}
                    id={c.id}
                    name={c.name}
                    continents={c.continents}
                    population={c.population}
                    flags={c.flags}
                  />
                );
              })
            ) : (
              <h1>{error}</h1>
            )}

            <div>
              <a href="#">
                <button className="btn-up">Go up ↑</button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
