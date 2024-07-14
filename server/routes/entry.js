const express = require("express");
const entryController = require("../controller/entry.js");
const router = express.Router();

router.route('/entry').post(entryController.submitEntry);
router.route('/entries').get(entryController.getAllEntries);
router.route('/entry/:id').get(entryController.getEntryProducts);
router.route('/entry/:id/upvote').post(entryController.upvoteEntry);
router.route('/entry/:id/products').get(entryController.getEntryProductDetails);

module.exports = router;