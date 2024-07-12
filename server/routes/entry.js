const express = require("express");
const entryController = require("../controller/entry.js");
const router = express.Router();

router.route('/entry').post(entryController.submitEntry);

module.exports = router;