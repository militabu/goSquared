const { Router } = require('express')

const router = Router();
const Office = require('./models/office')

router.get('/office', async (req, res) => {
    try {
        const office = await Office.find()
        res.json(office)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.post('/office', async (req, res) => {
    const officeDash = new Office({
        onlineVisitors: req.body.onlineVisitors,
        officeTemperature: req.body.officeTemperature,
        plantWatering: req.body.plantWatering,
        outsideTemperature: req.body.outsideTemperature,
        drinksInFridge: req.body.drinksInFridge
    })

    try {
        const newOffice = await officeDash.save()
        res.status(201).json(newOffice)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

router.delete('/office/:id', async (req, res) => {
    const id = req.params.id
    try {
        const result = await Office.findByIdAndDelete(id)
        res.send(result)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})


module.exports = router;