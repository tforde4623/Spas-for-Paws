module.exports = function(sequelize, DataTypes) {
  const Appointments = sequelize.define(
    "Appointments",
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      appointment_time: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      animal: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ["Dog", "Cat", "Rabbit"],
        validate: {
          len: [1]
        }
      },
      service: {
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

  return Appointments;
};
