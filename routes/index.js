import express from "express";
const router = express.Router();
import urlController from "../controllers/appController.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";

/**
 *  @swagger
 *  /url/{id}:
 *    get:
 *     summary: redirect to the original URL from short URL
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '302':
 *         message: Redirect to the original URL
 */
router.get("/url/:path", urlController.getOriginalUrl);
/**
 *  @swagger
 *  /analytics:
 *    get:
 *     summary: Get the analysis of data
 *     responses:
 *       200:
 *         description: Successfully fetched
 */
router.get("/analytics", urlController.getAnalytics);
/**
 *  @swagger
 *  /short-url:
 *    post:
 *     summary: redirect to the original URL from short URL
 *     requestBody:
 *          description: Create a new pet in the store
 *          required: true
 *          content:
 *           application/json:
 *             schema:
 *                required:
 *                  - url
 *                  - duration
 *                properties:
 *                  url:
 *                     type: string
 *                     example: https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Map
 *                  duration:
 *                     type: string
 *                     example: 3
 *     responses:
 *       200:
 *         description: Successfully created
 */
router.post(
  "/short-url",
  validationMiddleware.preValidate,
  urlController.shortenUrl
);

export default router;
