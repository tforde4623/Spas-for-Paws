module.exports = function(sequelize, DataTypes) {
  const Services = sequelize.define(
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
      underscored: true
    }
  );

  // Associations for the Services table
  Services.associate = function(models) {
    // Services belongs to Appointments by service_id fk
    Services.belongsTo(models.Appointments);
  };

  return Services;
};
