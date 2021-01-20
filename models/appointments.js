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
      underscored: true
    }
  );

  // Associations for the appointment table
  Appointments.associate = function(models) {
    // Appointments has many services
    Appointments.hasMany(models.services);
    // Appintments has many users
    Appointments.hasMany(models.user);
  };

  return Appointments;
};
