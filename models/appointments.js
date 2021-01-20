module.exports = function(sequelize, DataTypes) {
  const Pets = sequelize.define(
    "Pets",
    {
      appointment_time: {
        type: DataTypes.DATE(6),
        allowNull: true,
        validate: {
          len: [1]
        }
      },
      user_id: {
        type: DataTypes.INT,
        allowNull: false,
        len: [1]
      },
      service_id: {
        type: DataTypes.INT,
        allowNull: false,
        len: [1]
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true,
        len: [1, 255]
      }
    },
    {
      freezeTableName: true
    }
  );

  return Pets;
};