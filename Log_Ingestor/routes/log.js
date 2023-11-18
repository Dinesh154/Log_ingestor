const express = require("express");
const {add_log,fetLogsForFullTextSearch,fetLogsForNullSearch} = require("../controllers/add_log");
const router = express.Router();
router.post("/add_log", add_log);
router.post("/search", fetLogsForNullSearch);
router.post("/search/:text", fetLogsForFullTextSearch);


module.exports = router;