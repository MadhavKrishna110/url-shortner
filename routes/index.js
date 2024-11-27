const express = require("express");
const router = express.Router();
const urlController = require("../controllers/appController");

router.get("/url/:path", urlController.getOriginalUrl);
router.get("/analytics", urlController.getAnalytics);
router.post("/shorten", urlController.shortenUrl);

module.exports = router;
