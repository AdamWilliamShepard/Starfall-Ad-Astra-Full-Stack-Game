const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
} = require("../modules/authentication-middleware");


router.get('/', rejectUnauthenticated, (req, res) => {
let queryText = `SELECT * FROM "HeroStats"`
pool.query(queryText)
.then((result) => {
    res.send(result.rows)
})
.catch((error) => {
    console.log(error)
    res.sendStatus(500)
})
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;
