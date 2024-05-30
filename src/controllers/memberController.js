const { Member, Borrow } = require('../models');

// Shows all existing members and The number of books being borrowed by each member
const getAllMembers = async (req, res) => {
  try {
    const members = await Member.findAll({
      attributes: ['code', 'name'],
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
    const filteredMembers = members.map((member) => {
      const obj = member.toJSON();
      delete obj.borrow;
      return obj;
    });

    return res.json(filteredMembers);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMembers,
};
