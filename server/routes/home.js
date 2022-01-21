const { Router } = require('express');
const router = Router();
const book = require('../models/books');
const authorisation = require('../middlewares/authorisation');
const student = require('../models/student');


router.post('/addbook', authorisation, async(req, res) => {

    try {
        const { name, author, publication_year } = req.body;

        const response = new book({
            uid: req.user.id,
            name: name,
            author: author,
            publication_year: publication_year
        });

        const parseRes = await response.save();
        console.log(parseRes);
        res.json(parseRes);

    } catch (err) {
        console.log(err.message);
    }
});

router.get('/books', authorisation, async(req, res) => {
    try {
        const response = await book.find({ uid: req.user.id });
        // const parseRes = await response.json();
        console.log(response);
        res.json(response);
    } catch (err) {
        console.log(err.message);
    }
});

router.post('/addstudent', authorisation, async(req, res) => {

    try {
        const { name, classSection, imageUrl } = req.body;

        const response = new student({
            uid: req.user.id,
            name: name,
            classSection: classSection,
            imageUrl: imageUrl
        });

        const parseRes = await response.save();

        res.json(parseRes);

    } catch (err) {
        console.log(err.message);
    }
});

router.get('/students', authorisation, async(req, res) => {
    try {
        const response = await student.find({ uid: req.user.id });

        console.log(response);
        res.json(response);
    } catch (err) {
        console.log(err.message);
    }
})

router.delete('/:id', authorisation, async(req, res) => {
    const { id } = req.params;
    try {
        const response = await student.deleteOne({ _id: id });
        // const parseRes = await response.json();
        res.json(response);
    } catch (err) {
        console.log(err.message)
    }
});

router.delete('/bookdelete/:id', authorisation, async(req, res) => {
    const { id } = req.params;
    try {
        const response = await book.deleteOne({ _id: id });
        // const parseRes = await response.json();
        res.json(response);
    } catch (err) {
        console.log(err.message)
    }
});

router.put('/updatebook/:id', authorisation, async(req, res) => {
    const { id } = req.params;
    const { name, author, publication_year } = req.body;
    try {
        const filter = { _id: id };
        const update = { name: name, author: author, publication_year: publication_year };

        // `doc` is the document _after_ `update` was applied because of
        // `new: true`
        const response = await book.findOneAndUpdate(filter, update, {
            new: true
        });
        res.json(response);
    } catch (err) {
        console.log(err.message);
    }
});

router.put('/updatestudent/:id', authorisation, async(req, res) => {
    const { id } = req.params;
    const { name, classSection, imageUrl } = req.body;
    try {
        const filter = { _id: id };
        const update = { name: name, classSection: classSection, imageUrl: imageUrl };

        // `doc` is the document _after_ `update` was applied because of
        // `new: true`
        const response = await student.findOneAndUpdate(filter, update, {
            new: true
        });
        res.json(response);
    } catch (err) {
        console.log(err.message);
    }
});

// router.get('/', async(req, res) => {
//     try {
//         const parseRes = await librarian.find();
//         res.json(parseRes);
//     } catch (err) {
//         console.log(err.message);
//     }
// });

// router.get('/:id', async(req, res) => {
//     try {
//         const { id } = req.params;
//         const parseRes = await librarian.findById(id);
//         console.log(parseRes);
//         res.json(parseRes);
//     } catch (err) {
//         console.log(err.message);
//     }
// })
// router.get('/:id', async(req, res) => {
//     try {
//         const { id } = req.params;
//         const parseRes = await librarian.findById(id);
//         console.log(parseRes);
//         res.json(parseRes);
//     } catch (err) {
//         console.log(err.message);
//     }
// });
// router.post('/create', async(req, res) => {
//     const { name, roll } = req.body;
//     const librarian = new schema({
//         name: name,
//         roll: roll
//     })
//     try {
//         const parseRes = await librarian.save();
//         console.log(parseRes);
//         res.json(parseRes);
//     } catch (err) {
//         console.log(err.message);
//     }
// });

// router.patch('/:id', async(req, res) => {
//     try {
//         const parseRes = await librarian.updateOne({ _id: req.params.id }, { $set: { name: "sanvi", roll: 88 } });
//         console.log(parseRes);
//         res.json(parseRes);
//     } catch (err) {
//         console.log(err.message);
//     }
// });

// router.delete('/:id', async(req, res) => {
//     try {
//         const { id } = req.params;
//         const parseRes = await librarian.remove({ _id: id });
//         res.json(parseRes);
//     } catch (error) {
//         console.log(error.message);
//     }
// });
// // pagination

// router.get('/paginated/id', async(req, res) => {
//     try {
//         const page = parseInt(req.query.page);
//         const limit = parseInt(req.query.limit);
//         const parseRes = await librarian.find();

//         const startIndex = (page - 1) * limit;
//         const endIndex = page * limit;
//         const paginatedArray = parseRes.slice(startIndex, endIndex);

//         res.json(paginatedArray);

//     } catch (err) {
//         console.log(err.message);
//     }
// });





module.exports = router;