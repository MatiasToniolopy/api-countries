const axios = require('axios');
const { Op } = require('sequelize');
const { Country, Activity } = require('../db');


const getAllCountries = async () => {
    try {
        const { data } = await axios.get('https://restcountries.com/v3/all');
        await data.forEach(el => {
            Country.findOrCreate({
                where: {
                    id: el.cca3,
                    name: el.name.common,
                    flags: el.flags[0],
                    continents: el.continents[0],
                    capital: el.capital ? el.capital[0] : "Capital does not exist",
                    subregion: el.subregion ? el.subregion : 'Subregion does not exist',
                    area: el.area,
                    population: el.population
                }
            })
        })
    } catch (error) {
        console.error('Hubo un error en la peticion ==> ', error);
    }
}

const getCountriesDB = async (name = null) => {
    let dbInfo = [];
    if (name) {
        dbInfo = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            },
            include: [Activity]
        })
    } else {
        dbInfo = await Country.findAll({
            include: [Activity]
        });
    }
    return dbInfo;
}


module.exports = { getAllCountries, getCountriesDB };