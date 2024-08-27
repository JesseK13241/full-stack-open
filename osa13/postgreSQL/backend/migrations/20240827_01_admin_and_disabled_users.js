const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    const hasAdminColumn = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='users' AND column_name='admin';
    `);

    if (hasAdminColumn[0].length === 0) {
      await queryInterface.addColumn("users", "admin", {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      });
    }

    const hasDisabledColumn = await queryInterface.sequelize.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name='users' AND column_name='disabled';
    `);

    if (hasDisabledColumn[0].length === 0) {
      await queryInterface.addColumn("users", "disabled", {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      });
    }
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn("users", "admin");
    await queryInterface.removeColumn("users", "disabled");
  }
};
