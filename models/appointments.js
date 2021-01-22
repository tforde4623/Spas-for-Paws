module.exports = function(sequelize, DataTypes) {
  const Appointments = sequelize.define(
    "Appointments",
    {
      appointment_time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      comments: {
        type: DataTypes.STRING,
        allowNull: true,
        len: [1, 255]
      }
    },
    {
      underscored: true
    }
  );

  // Associations for the appointment table
  Appointments.associate = function(models) {
    // Appointments has many services
    Appointments.belongsTo(models.Services);
    // Appointments has many users
    Appointments.belongsTo(models.User);
  };

  return Appointments;
};
