const express = require('express');
const router = express.Router();
const { borrowBook, returnBook } = require('../controllers/borrowController');

/**
 * @swagger
 * /v1/borrow:
 *   post:
 *     tags: [Borrow]
 *     summary: Borrow a book
 *     description: Borrow a book from the library.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 member_id:
 *                   type: integer
 *                   example: 1
 *                 book_id:
 *                   type: integer
 *                   example: 1
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Member or Book not found
 *       500:
 *         description: Internal server error
 */
router.post('/', borrowBook);

/**
 * @swagger
 * /v1/borrow/return:
 *  post:
 *   tags: [Borrow]
 *   summary: Return a book
 *   description: Return a book to the library.
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             borrow_id:
 *               type: integer
 *               example: 1
 *             member_id:
 *               type: integer
 *               example: 1
 *   responses:
 *     200:
 *       description: Book returned successfully
 *     400:
 *       description: Bad request
 *     404:
 *       description: Borrow not found
 *     500:
 *       description: Internal server error
 */

router.post('/return', returnBook);

module.exports = router;
