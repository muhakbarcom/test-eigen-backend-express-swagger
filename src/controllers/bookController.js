const { sequelize, Book, Borrow } = require('../models');
const { Op } = require('sequelize');

// Shows all existing books and quantities, Books that are being borrowed are not counted
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll({
      attributes: ['id', 'code', 'title', 'stock'],
      include: {
        model: Borrow,
        as: 'borrow',
        attributes: ['id'],
        where: { returned_at: null },
        required: false,
      },
      exclude: ['createdAt', 'updatedAt'],
    });

    // remove borrow:[] property
    const filteredBooks = books.map((book) => {
      const obj = book.toJSON();
      delete obj.borrow;
      return obj;
    });

    return res.json(filteredBooks);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllBooks,
};
