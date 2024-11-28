import express from "express";
const router = express.Router();
import urlController from "../controllers/appController.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

router.get("/url/:path", urlController.getOriginalUrl);
router.get("/analytics", urlController.getAnalytics);
router.post(
  "/short-url",
  validationMiddleware.preValidate,
  urlController.shortenUrl
);

export default router;
