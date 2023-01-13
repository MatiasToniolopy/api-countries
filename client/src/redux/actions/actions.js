import axios from 'axios';
import {
    DELETE_COUNTRIES,
    GET_ACTIVITIES,
    GET_ALL_COUNTRIES,
    GET_COUNTRIES_DETAILS,
    GET_COUNTRIES_NAMES,
    ORDER_BY_ACTIVITIES,
    ORDER_BY_ALPHA,
    ORDER_BY_CONTINENT,
    ORDER_BY_POPULATION,
    SET_LOADING,
    UPDATE_COUNTRIES,
    DELETE_ACTIV }
from '../actionsTypes/actionsTypes';


export default function getAllCountries() {
    return async function (dispatch) {
        try {
            dispatch({
                type: SET_LOADING,
                payload: { isLoading: true }
            })
            let allCountries = await axios.get('http://localhost:3001/countries');
            dispatch({
                type: GET_ALL_COUNTRIES,
                payload: allCountries.data
            })
            return dispatch({
                type: SET_LOADING,
                payload: { isLoading: false }
            })
        } catch (error) {
            console.error('Error en actions getAllCountries -> ' + error);
        }
    }
};


export function getCountriesDetails(id) {
    return function (dispatch) {
        try {
            dispatch({
                type: SET_LOADING,
                payload: { isLoading: true }
            })
            axios.get(`http://localhost:3001/countries/${id}`)
                .then(res => {
                    dispatch({
                        type: GET_COUNTRIES_DETAILS,
                        payload: res.data
                    });
                    dispatch({
                        type: SET_LOADING,
                        payload: { isLoading: false }
                    })
                });
        } catch (error) {
            console.error('Error en actions getCountriesDetails -> ' + error);
        }
    }
};
export function deleteCountries(id) {
    return function (dispatch) {
        try {
            dispatch({
                type: SET_LOADING,
                payload: { isLoading: true }
            })
            axios.delete(`http://localhost:3001/countries/${id}`)
                .then(res => {
                    dispatch({
                        type: DELETE_COUNTRIES,
                        payload: res.data
                    });
                    dispatch({
                        type: SET_LOADING,
                        payload: { isLoading: false }
                    })
                });
        } catch (error) {
            console.error('Error en actions deleteCountries -> ' + error);
        }
    }
}

export function updateCountries(id, name, population) {
    return function (dispatch) {
        try {
            dispatch({
                type: SET_LOADING,
                payload: { isLoading: true }
            })
            axios.put(`http://localhost:3001/countries/${id}`, { name, population })
                .then(res => {
                    dispatch({
                        type: UPDATE_COUNTRIES,
                        payload: res.data
                    });
                    dispatch({
                        type: SET_LOADING,
                        payload: { isLoading: false }
                    })
                });
        } catch (error) {
            console.error('Error en actions updateCountries -> ' + error);
        }
    }
}

export function getCountriesNames(name) {
    return async function (dispatch) {
        try {
            dispatch({
                type: SET_LOADING,
                payload: { isLoading: true }
            })
            const countriesJson = await axios.get(`http://localhost:3001/countries?name=${name}`);
            dispatch({
                type: GET_COUNTRIES_NAMES,
                payload: countriesJson.data
            })
            return dispatch({
                type: SET_LOADING,
                payload: { isLoading: false }
            })
        } catch (error) {
            console.error('Error en actions getCountriesNames -> ' + error);
        }
    }
};


export function postActivity(payload) {
    return async function () {
        try {
            const newAct = await axios.post('http://localhost:3001/activity', payload);
            return newAct;
        } catch (error) {
            console.error('Error en actions postActivity -> ' + error);
        }
    }
};

export function getActivities() {
    return async function (dispatch) {
        try {
            let actJson = await axios.get('http://localhost:3001/activity');
            return dispatch({
                type: GET_ACTIVITIES,
                payload: actJson.data
            })
        } catch (error) {
            console.error('Error en actions getActivities -> ' + error);
        }
    }
};

export function deleteActivities(id) {
    return async function (dispatch) {
        try {
            let actJson = await axios.delete(`http://localhost:3001/activity/${id}`);
            return dispatch({
                type: DELETE_ACTIV,
                payload: actJson.data
            })
        } catch (error) {
            console.error('Error en actions deleteActivities -> ' + error);
        }
    }
}


//FILTERS SELECTS

export const orderByContinent = (payload) => {
    return {
        type: ORDER_BY_CONTINENT,
        payload
    }
};

export const orderByPopulation = (payload) => {
    return {
        type: ORDER_BY_POPULATION,
        payload
    }
};

export const orderByAlpha = (payload) => {
    return {
        type: ORDER_BY_ALPHA,
        payload
    }
};

export const orderByActivities = (payload) => {
    return {
        type: ORDER_BY_ACTIVITIES,
        payload
    }
};
