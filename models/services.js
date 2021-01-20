module.exports = function(sequelize, DataTypes) {
  const Pets = sequelize.define(
    "Services",
    {
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ["Dog", "Cat", "Rabbit"],
        validate: {
          len: [1]
        }
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ["Haircut", "Shed Release", "Bath"],
        validate: {
          len: [1]
        }
      }
    },
    {
      freezeTableName: true
    }
  );

  Pets.associate = function(models) {
    // We're saying that a Pets should belong to an User
    // A Pets can't be created without an User due to the foreign key constraint
    Pets.belongsTo(models.appointments, {
      foreignKey: "service_id"
    });
  };

  return Pets;
};
