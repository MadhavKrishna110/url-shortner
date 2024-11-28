const express = require("express");
const router = express.Router();
const urlController = require("../controllers/appController");
const validationMiddleware =
  require("../middlewares/validationMiddleware").default;

router.get("/url/:path", urlController.getOriginalUrl);
router.get("/analytics", urlController.getAnalytics);
router.post(
  "/shorten",
  validationMiddleware.preValidate,
  urlController.shortenUrl
);

module.exports = router;
