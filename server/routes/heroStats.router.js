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

/**
 * POST route template
 */
router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;
