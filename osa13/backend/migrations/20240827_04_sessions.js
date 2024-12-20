const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("sessions", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" }
      },
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      expires_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      created_at: {
        type: DataTypes.DATE
      },
      updated_at: {
        type: DataTypes.DATE
      }
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("sessions", { cascade: true });
  }
};
