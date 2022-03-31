const express = require("express")
const router = express.Router();
const fs = require('fs');

const { matchRoutes, pointRoutes } = require('./matchRoutes')

router.use(matchRoutes)
router.use(pointRoutes)

module.exports = router;