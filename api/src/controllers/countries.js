const { Router } = require('express');
const Sequelize = require('sequelize');
const router = Router();
const { Country, Activity } = require('../db');
const { getAllCountries, getCountriesDB } = require('../getcCountryAndDb/getAllCountry')


router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        let countries = await getCountriesDB(name);
        if (!countries || countries.length === 0) {
            await getAllCountries();
            countries = await getCountriesDB(name);
        };
        res.status(200).send(countries);
    } catch (error) {
        console.eror('error ==> ', error);
        res.status(500).json({ error: 'Error Server' });
    }
});


router.get('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    try {
        const idName = await Country.findOne({
            where: { id: idPais.toUpperCase() },
            include: [Activity]
        });
        idName ?
            res.status(200).send(idName) :
            res.status(400).json({ error: `No date found with ${idPais}` })
    } catch (error) {
        res.status(404).json({ error: 'ID not found' })
    }
})


router.delete('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    try {
        const idName = await Country.findOne({
            where: { id: idPais.toUpperCase() },
            include: [Activity]
        });
        idName ?
            await Country.destroy({ where: { id: idPais.toUpperCase() } }) :
            res.status(400).json({ error: `No date found with ${idPais}` })
        res.status(200).json({ message: 'Country deleted' })
    } catch (error) {
        res.status(404).json({ error: 'ID not found' })
    }
})

router.put('/:idPais', async (req, res) => {
    const { idPais } = req.params;
    const { name, population, activities } = req.body;
    try {
        const idName = await Country.findOne({
            where: { id: idPais.toUpperCase() },
            include: [Activity]
        });
        idName ?
            await Country.update({ name, population }, { where: { id: idPais.toUpperCase() } }) :
            res.status(400).json({ error: `No date found with ${idPais}` })
        res.status(200).json({ message: 'Country updated' })
    } catch (error) {
        res.status(404).json({ error: 'ID not found' })
    }
})

router.post('/', async (req, res) => {
    const { name, id, flag, continent, capital, subregion, area, population } = req.body;
    try {
        const idName = await Country.findOne({
            where: { id: id.toUpperCase() },
            include: [Activity]
        });
        idName ?
            res.status(400).json({ error: `Country already exists with ${id}` }) :
            await Country.create({ name, id, flag, continent, capital, subregion, area, population });
        res.status(200).json({ message: 'Country created' })
    } catch (error) {
        res.status(404).json({ error: 'ID not found' })
    }
});

module.exports = router;