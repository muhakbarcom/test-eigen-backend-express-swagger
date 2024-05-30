const express = require('express');
const router = express.Router();
const { getAllMembers } = require('../controllers/memberController');

/**
 * @openapi
 * /v1/member:
 *   get:
 *     tags: [Member]
 *     description: Retrieve a list of members
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', getAllMembers);

module.exports = router;
