'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const fs = require('fs');
    const data = fs.readFileSync('./data/member.json', 'utf8');
    const members = JSON.parse(data);

    members.map((element) => {
      element.createdAt = new Date();
      element.updatedAt = new Date();
    });

    await queryInterface.bulkInsert('Members', members, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('members', null, {});
  },
};
