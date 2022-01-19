const { Router } = require('express');
const student = require('../models/student');
const router = Router();


router.get('/', async(req, res) => {
    try {
        const parseRes = await student.find();
        res.json(parseRes);
    } catch (err) {
        console.log(err.message);
    }
});

router.get('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const parseRes = await student.findById(id);
        console.log(parseRes);
        res.json(parseRes);
    } catch (err) {
        console.log(err.message);
    }
})

router.post('/create', async(req, res) => {
    const { name, roll } = req.body;
    const student = new schema({
        name: name,
        roll: roll
    })
    try {
        const parseRes = await student.save();
        console.log(parseRes);
        res.json(parseRes);
    } catch (err) {
        console.log(err.message);
    }
});

router.patch('/:id', async(req, res) => {
    try {
        const parseRes = await student.updateOne({ _id: req.params.id }, { $set: { name: "sanvi", roll: 88 } });
        console.log(parseRes);
        res.json(parseRes);
    } catch (err) {
        console.log(err.message);
    }
});

router.delete('/:id', async(req, res) => {
    try {
        const { id } = req.params;
        const parseRes = await student.remove({ _id: id });
        res.json(parseRes);
    } catch (error) {
        console.log(error.message);
    }
});
// pagination

router.get('/paginated/id', async(req, res) => {
    try {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const parseRes = await student.find();

        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedArray = parseRes.slice(startIndex, endIndex);

        res.json(paginatedArray);

    } catch (err) {
        console.log(err.message);
    }
});





module.exports = router;