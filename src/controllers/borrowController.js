const { sequelize, Member, Book, Borrow, Penalty } = require('../models');
const { Op } = require('sequelize');

const borrowBook = async (req, res) => {
  try {
    // get borrow data from request body
    const borrowData = req.body;

    // Check if borrow data is not an array
    if (!Array.isArray(borrowData)) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    // check if member borrow more than 2 books
    const memberBorrowCounts = borrowData.reduce((acc, { member_id }) => {
      acc[member_id] = (acc[member_id] || 0) + 1;
      return acc;
    }, {});

    for (const count of Object.values(memberBorrowCounts)) {
      if (count > 2) {
        return res.status(400).json({ error: 'You can only borrow 2 books' });
      }
    }

    // Cek apakah member sedang dipenalti
    const memberIds = borrowData.map((data) => data.member_id);
    const currDate = new Date();

    const penalizedMembers = await Penalty.findAll({
      where: {
        end_date: { [Op.gte]: currDate },
      },
      include: {
        model: Borrow,
        as: 'borrowed_book', // Gunakan alias yang sesuai dengan asosiasi
        where: { member_id: { [Op.in]: memberIds } },
      },
    });

    if (penalizedMembers.length > 0) {
      const penalizedMemberIds = penalizedMembers.map(
        (p) => p.borrowed_book.member_id
      );
      return res.status(400).json({
        error: `Member with ID ${penalizedMemberIds.join(
          ', '
        )} is currently being penalized`,
      });
    }

    // Flag to ensure only one response is sent
    let responseSent = false;

    await sequelize.transaction(async (t) => {
      for (let i = 0; i < borrowData.length; i++) {
        const { member_id, book_id } = borrowData[i];

        const member = await Member.findByPk(member_id, { transaction: t });
        const book = await Book.findByPk(book_id, { transaction: t });

        // Check if member or book is not found
        if (!member || !book) {
          responseSent = true;
          return res.status(404).json({ error: 'Member or Book not found' });
        }

        // Check if book is already borrowed
        const borrowedBook = await Borrow.findOne({
          where: { returned_at: null, book_id: book_id },
          transaction: t,
        });

        if (borrowedBook) {
          responseSent = true;
          return res.status(400).json({ error: 'Book is already borrowed' });
        }

        // Check if member has already borrowed two books
        const borrowedBooksByMember = await Borrow.count({
          where: { member_id: member_id, returned_at: null },
          transaction: t,
        });

        if (borrowedBooksByMember >= 2) {
          responseSent = true;
          return res
            .status(400)
            .json({ error: 'Member can only borrow 2 books' });
        }

        // Check if member is currently penalized
        if (member.penaltyStatus === 'active') {
          responseSent = true;
          return res
            .status(400)
            .json({ error: 'Member is currently being penalized' });
        }

        await Borrow.create({ member_id, book_id }, { transaction: t });

        await Book.update(
          { stock: book.stock - 1 },
          { where: { id: book_id }, transaction: t }
        );
      }
    });

    if (!responseSent) {
      res.status(200).json({ message: 'Book borrowed successfully' });
    }
  } catch (error) {
    console.error(error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

const returnBook = async (req, res) => {
  try {
    // get borrow_id and member_id from request body
    const { borrow_id, member_id } = req.body;

    // Check if borrow_id and member_id is not provided
    if (!borrow_id || !member_id) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    // Find borrow data by borrow_id
    const borrow = await Borrow.findByPk(borrow_id);

    // Check if borrow data is not found
    if (!borrow) {
      return res.status(404).json({ error: 'Borrow data not found' });
    }

    // Check if member_id is not the same as the one in borrow data
    if (borrow.member_id !== member_id) {
      return res
        .status(400)
        .json({ error: 'You are not allowed to return this book' });
    }

    // Check if book is already returned
    if (borrow.returned_at) {
      return res.status(400).json({ error: 'Book is already returned' });
    }

    let isLate = false; // Flag to check if the book is returned after more than 7 days

    // If the book is returned after more than 7 days, the member will be subject to a penalty. Member with penalty cannot able to borrow the book for 3 days
    const borrowDate = new Date(borrow.createdAt);

    if (new Date() - borrowDate > 7 * 24 * 60 * 60 * 1000) {
      isLate = true;
    }

    await sequelize.transaction(async (t) => {
      if (isLate) {
        const start_penalty_date = new Date(); // today
        const end_penalty_date = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 days

        // Create penalty data
        await Penalty.create(
          {
            borrowed_id: borrow_id,
            start_date: start_penalty_date,
            end_date: end_penalty_date,
          },
          { transaction: t }
        );
      }

      // Update borrow data
      await Borrow.update(
        { returned_at: new Date() },
        { where: { id: borrow_id }, transaction: t }
      );

      const book = await Book.findByPk(borrow.book_id, { transaction: t });

      await Book.update(
        { stock: book.stock + 1 },
        { where: { id: borrow.book_id }, transaction: t }
      );
    });

    res.status(200).json({
      message: `Book returned successfully ${
        isLate
          ? ', but you have a penalties and cannot borrow a book until 3 days!'
          : ''
      }`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  borrowBook,
  returnBook,
};
