module.exports = function (sequelize, DataTypes) {
  let Pets = sequelize.define("Pets",
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ['dog', 'cat', 'rabbit'],
        validate: {
          len: [1],
        },
      },
      grooming_services: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ['Haircut', 'Shed Release', 'Bath'],
        validate: {
          len: [1],
        },
      },
      appointment_time: {
        type: DataTypes.DATE(6),
        allowNull: true,
        validate: {
          len: [1],
        },
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true,
        len: [1, 255],
      },
    },
    {
      freezeTableName: true,
    }
  );

  Pets.associate = function (models) {
    // We're saying that a Pets should belong to an User
    // A Pets can't be created without an User due to the foreign key constraint
    Pets.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Pets;
};