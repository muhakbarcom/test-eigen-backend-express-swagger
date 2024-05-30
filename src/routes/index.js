const express = require('express');
const router = express.Router();

// Import rute
const membersRoutes = require('./members');
const booksRoutes = require('./books');
const borrowsRoutes = require('./borrows');

// Gunakan rute dengan prefix /v1
router.use('/member', membersRoutes);
router.use('/book', booksRoutes);
router.use('/borrow', borrowsRoutes);

module.exports = router;
