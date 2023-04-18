const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");


router.get('/', rejectUnauthenticated, (req, res) => {
    let queryText = `SELECT * 
        FROM "HeroStats"
        INNER JOIN "HeroInfo"
        USING (user_id)
        WHERE user_id = $1;`
    let queryValues = [req.user.id]
    pool.query(queryText, queryValues)
        .then((result) => {
            res.send(result.rows)
        })
        .catch((error) => {
            console.log(error)
            res.sendStatus(500)
        })
});

router.post('/', rejectUnauthenticated, (req, res) => {
    console.log("this is req.body", req.body)
    let queryText = `
    INSERT INTO "HeroInfo" ("Name", "Background", "Avatar", "user_id")
    VALUES ($1, $2, $3, $4);`
    let queryValues = [req.body.Name, req.body.Background, req.body.Avatar, req.user.id]
    pool.query(queryText, queryValues)
    .then((result) => {
        res.sendStatus(201)
    })
    .catch((error) => {
        console.log(error)
        res.sendStatus(500)
    })
});

module.exports = router;
