const { Router } = require('express');
const Sequelize = require('sequelize');
const router = Router();
const { Country, Activity } = require('../db');


router.post('/', async (req, res) => {
    const { name, difficulty, duration, season, countries } = req.body;
    try {
        await createActivitiesAndAddCountries({ name, difficulty, duration, season }, countries);
        res.send('Activity created');
    } catch (error) {
        res.status(500).send('Error creating the activity -->' + error)
    }
});

router.get('/', async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: [Country],
            attributes: ["id", "name", "difficulty", "duration", "season"]
        });
        res.json(activities);
    } catch (error) {
        res.json({ error: "There is not an activity created" });
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Activity.destroy({ where: { id } });
        res.send('Activity deleted');
    } catch (error) {
        res.status(500).send('Error deleting the activity -->' + error)
    }
});




const createActivitiesAndAddCountries = async (activity, countries = []) => {
    const activities = await Activity.create({
        name: activity.name,
        difficulty: activity.difficulty,
        duration: activity.duration,
        season: activity.season
    });
    countries.forEach(async country => {
        let countryDB = await Country.findAll({ where: { id: country } })
        if (countryDB) {
            activities.addCountries(countryDB);
        }
    })
};




module.exports = router;