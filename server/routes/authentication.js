const { Router } = require('express');
const pool = require('../models/student');
const router = Router();
const bycrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const authorisation = require('../middlewares/authorisation');
const validInfo = require('../middlewares/validInfo');

router.post("/register", validInfo, async(request, response) => {
    console.log(request.body);
    try {

        const { name, email, password } = request.body;

        const user = await pool.findOne({ email: email });

        console.log(user, "i was here");

        if (user !== null) {
            response.status(401).send("User Already Exists");
        }


        // bycrpyting (hiding password)
        const saltRound = 10;
        const generateSalt = await bycrypt.genSalt(saltRound);

        const bycryptPassword = await bycrypt.hash(password, generateSalt);


        const newUser = new pool({
            name: name,
            email: email,
            password: bycryptPassword
        })
        const parseRes = await newUser.save();
        const token = jwtGenerator(newUser._id);
        console.log(parseRes);
        return response.json({ token });

    } catch (err) {
        console.log(err.message);
        response.status(500).send("server error");
    }
});

router.post('/login', validInfo, async(request, response) => {

    try {
        const { email, password } = request.body;

        // const user = await pool.query('SELECT * FROM users WHERE user_email = $1', [email]);
        const user = await pool.findOne({ email: email })
            //check if user exists
        if (user === null) {
            return response.status(401).send("Email or Password Incorrect");
        }
        //check if password is same
        const validPassword = await bycrypt.compare(password, user.password);

        if (!validPassword) {
            return response.status(401).send("Email or Password Incorrect");
        }
        //grant the token

        const token = jwtGenerator(user._id);
        // console.log(token);

        return response.json({ token });




    } catch (err) {
        response.set(401).send(err.message);
    }
});





router.get("/verify", authorisation, async(request, response) => {
    try {
        response.json(true);
    } catch (err) {
        console.log(err);
        response.set(500).send(err);
    }
});


module.exports = router;