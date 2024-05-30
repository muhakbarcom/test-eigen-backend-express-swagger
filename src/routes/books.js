const express = require('express');
const router = express.Router();
const { getAllBooks } = require('../controllers/bookController');

/**
 * @swagger
 * /v1/book:
 *   get:
 *     tags: [Book]
 *     summary: Retrieve a list of books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   code:
 *                     type: string
 *                   title:
 *                     type: string
 *                   author:
 *                     type: string
 */
router.get('/', getAllBooks);

module.exports = router;
